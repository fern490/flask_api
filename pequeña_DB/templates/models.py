from flask_sqlalchemy import SQLAlchemy
from pequeña_DB.templates.config import db
from datetime import datetime, UTC

class Usuario(db.Model):
    __tablename__ = 'usuarios'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    apellido = db.Column(db.String(100), nullable=False)
    fecha_nacimiento = db.Column(db.Date, nullable=False)
    genero = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    rol = db.Column(db.String(50), nullable=False)

    # Relaciones
    eventos = db.relationship('Evento', backref='usuario', lazy='dynamic')
    servicios_proveedor = db.relationship('Servicio', backref='proveedor', lazy='dynamic')
    notificaciones = db.relationship('Notificacion', backref='usuario', lazy='dynamic')
    mensajes_enviados = db.relationship('Mensaje', foreign_keys='Mensaje.remitente_id', backref='remitente', lazy='dynamic')
    mensajes_recibidos = db.relationship('Mensaje', foreign_keys='Mensaje.receptor_id', backref='receptor', lazy='dynamic')


class Salon(db.Model):
    __tablename__ = 'salones'
    salon_id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    direccion = db.Column(db.String(255))
    capacidad = db.Column(db.Integer)

    eventos = db.relationship('Evento', backref='salon', lazy='dynamic')


class Evento(db.Model):
    __tablename__ = 'eventos'
    evento_id = db.Column(db.Integer, primary_key=True)
    nombre_evento = db.Column(db.String(255), nullable=False)
    fecha = db.Column(db.Date, nullable=False)
    tema = db.Column(db.String(255))
    cantidad_personas = db.Column(db.Integer)
    informe = db.Column(db.Text)
    estado = db.Column(db.Enum('pendiente', 'aprobado', 'rechazado'), default='pendiente')
    salon_id = db.Column(db.Integer, db.ForeignKey('salones.salon_id'), nullable=False)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuarios.id'), nullable=False)

    pagos = db.relationship('Pago', backref='evento', lazy='dynamic')
    eventos_servicios = db.relationship('EventoServicio', backref='evento', lazy='dynamic')


class Servicio(db.Model):
    __tablename__ = 'servicios'
    servicio_id = db.Column(db.Integer, primary_key=True)
    nombre_servicio = db.Column(db.String(100), nullable=False)
    descripcion = db.Column(db.Text)
    costo = db.Column(db.Numeric(10,2), nullable=False)
    proveedor_id = db.Column(db.Integer, db.ForeignKey('usuarios.id'))

    eventos_servicios = db.relationship('EventoServicio', backref='servicio', lazy='dynamic')


class EventoServicio(db.Model):
    __tablename__ = 'eventos_servicios'
    id = db.Column(db.Integer, primary_key=True)
    evento_id = db.Column(db.Integer, db.ForeignKey('eventos.evento_id'), nullable=False)
    servicio_id = db.Column(db.Integer, db.ForeignKey('servicios.servicio_id'), nullable=False)

    __table_args__ = (db.UniqueConstraint('evento_id', 'servicio_id', name='uq_evento_servicio'),)


class Pago(db.Model):
    __tablename__ = 'pagos'
    pago_id = db.Column(db.Integer, primary_key=True)
    evento_id = db.Column(db.Integer, db.ForeignKey('eventos.evento_id'), nullable=False)
    monto = db.Column(db.Numeric(10,2), nullable=False)
    fecha_pago = db.Column(db.Date, nullable=False)
    metodo_pago = db.Column(db.String(50))


class Mensaje(db.Model):
    __tablename__ = 'mensajes'
    id = db.Column(db.Integer, primary_key=True)
    remitente_id = db.Column(db.Integer, db.ForeignKey('usuarios.id'), nullable=False)
    receptor_id = db.Column(db.Integer, db.ForeignKey('usuarios.id'), nullable=False)
    contenido = db.Column(db.Text, nullable=False)
    fecha_envio = db.Column(db.DateTime, default=datetime.utcnow)


class Contacto(db.Model):
    __tablename__ = 'contactos'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nombre = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(150), nullable=False)
    mensaje = db.Column(db.Text, nullable=False)
    fecha_envio = db.Column(db.DateTime, default=lambda: datetime.now(UTC))

class Postulacion(db.Model):
    __tablename__ = 'postulaciones'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    nombre = db.Column(db.String(100), nullable=False)
    telefono = db.Column(db.String(20))
    email = db.Column(db.String(150))
    localidad = db.Column(db.String(100))
    especialidad = db.Column(db.String(100))
    experiencia = db.Column(db.Text)
    edad = db.Column(db.Integer)
    genero = db.Column(db.String(20))
    cv_url = db.Column(db.String(255))
    fecha_postulacion = db.Column(db.DateTime, default=datetime.utcnow)


class Notificacion(db.Model):
    __tablename__ = 'notificaciones'
    id = db.Column(db.Integer, primary_key=True)
    usuario_id = db.Column(db.Integer, db.ForeignKey('usuarios.id'))
    mensaje = db.Column(db.Text)
    leido = db.Column(db.Boolean, default=False)
    fecha = db.Column(db.DateTime, default=datetime.utcnow)