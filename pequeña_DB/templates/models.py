from config import db
from datetime import datetime
from django.db import models

class Usuario(db.Model):
    __tablename__ = 'usuarios'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    apellido = db.Column(db.String(100), nullable=False)
    fecha_nacimiento = db.Column(db.Date, nullable=False)
    genero = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    rol = db.Column(db.String(50), nullable=False)
    #reset_token = db.Column(db.String(255), nullable=True)
    #reset_token_expira = db.Column(db.DateTime, nullable=True)

    #def set_password(self, password):
        #self.password = generate_password_hash(password)

    #def check_password(self, password):
        #return check_password_hash(self.password, password)

    # Relación con eventos
    eventos = db.relationship('Evento', backref='usuario', lazy=True)

class Salon(db.Model):
    __tablename__ = 'salones'
    salon_id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    direccion = db.Column(db.String(255))
    capacidad = db.Column(db.Integer)

    eventos = db.relationship('Evento', backref='salon', lazy=True)

class Evento(db.Model):
    __tablename__ = 'eventos'
    evento_id = db.Column(db.Integer, primary_key=True)
    nombre_evento = db.Column(db.String(255), nullable=False)
    fecha = db.Column(db.Date, nullable=False)
    tema = db.Column(db.String(255))
    informe_detallado = db.Column(db.Text)

    salon_id = db.Column(db.Integer, db.ForeignKey('salones.salon_id'), nullable=False)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuarios.id'), nullable=False)

    pagos = db.relationship('Pago', backref='evento', lazy=True)
    servicios = db.relationship('EventoServicio', backref='evento', lazy=True)

class Servicio(db.Model):
    __tablename__ = 'servicios'
    servicio_id = db.Column(db.Integer, primary_key=True)
    nombre_servicio = db.Column(db.String(100), nullable=False)
    descripcion = db.Column(db.Text)
    costo = db.Column(db.Numeric(10, 2))

    eventos = db.relationship('EventoServicio', backref='servicio', lazy=True)

class EventoServicio(db.Model):
    __tablename__ = 'eventos_servicios'
    id = db.Column(db.Integer, primary_key=True)
    evento_id = db.Column(db.Integer, db.ForeignKey('eventos.evento_id'), nullable=False)
    servicio_id = db.Column(db.Integer, db.ForeignKey('servicios.servicio_id'), nullable=False)

class Pago(db.Model):
    __tablename__ = 'pagos'
    pago_id = db.Column(db.Integer, primary_key=True)
    evento_id = db.Column(db.Integer, db.ForeignKey('eventos.evento_id'), nullable=False)
    monto = db.Column(db.Numeric(10, 2), nullable=False)
    fecha_pago = db.Column(db.Date, nullable=False)
    metodo = db.Column(db.String(50))

class Contacto(db.Model):
    __tablename__ = 'contactos'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nombre = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(150), nullable=False)
    mensaje = db.Column(db.Text, nullable=False)
    fecha_envio = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<Contacto {self.nombre} - {self.email}>"
    
class Postulacion(models.Model):
    GENERO_CHOICES = [
        ('Masculino', 'Masculino'),
        ('Femenino', 'Femenino'),
        ('Otro', 'Otro'),
        ('Prefiero no decir', 'Prefiero no decir'),
    ]

    nombre = models.CharField(max_length=100)
    telefono = models.CharField(max_length=20, blank=True, null=True)
    email = models.EmailField(max_length=150)
    localidad = models.CharField(max_length=100, blank=True, null=True)
    edad = models.PositiveIntegerField(blank=True, null=True)
    genero = models.CharField(max_length=20, choices=GENERO_CHOICES, blank=True, null=True)
    cv = models.FileField(upload_to='cv_postulaciones/', blank=True, null=True)  # Guarda en media/cv_postulaciones/
    comentarios = models.TextField(blank=True, null=True)
    fecha_postulacion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.nombre} - {self.email}"