from flask import Blueprint, request, jsonify
from pequeña_DB.templates.models import db, Usuario, Salon, Evento, Servicio, EventoServicio, Pago, Contacto, Mensaje
from datetime import datetime, date
import secrets
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy import or_

try:
    from google.oauth2 import id_token
    from google.auth.transport import requests as google_requests 
    GOOGLE_LIBS_AVAILABLE = True
except ImportError:
    GOOGLE_LIBS_AVAILABLE = False
    class MockRequest:
        def Request(self):
            pass
    google_requests = MockRequest()
    id_token = None

CLIENT_ID = "110218343931-a1uctqsv8ir4a9vpl9tsrbctbit87k9g.apps.googleusercontent.com"

routes = Blueprint('routes', __name__)

# ----------------------------------------
# REGISTRO DE USUARIOS
# ----------------------------------------
@routes.route('/usuarios', methods=['POST'])
def crear_usuario():
    data = request.json
    nombre = data.get('nombre')
    apellido = data.get('apellido')
    fecha_nacimiento = data.get('fecha_nacimiento')
    genero = data.get('genero')
    email = data.get('email')
    usuario = data.get("usuario")
    password = data.get('password')
    rol = data.get('rol')

    if not all([nombre, email, password, rol, usuario]):
        return jsonify({"message": "Faltan datos obligatorios (nombre, email, password, rol)"}), 400

    if Usuario.query.filter(or_(Usuario.email == email, Usuario.usuario == usuario)).first():
        return jsonify({"message": "El email o el nombre de usuario ya está registrado"}), 409

    hashed_password = generate_password_hash(password, method='pbkdf2:sha256')

    fecha_nacimiento_dt = None
    if fecha_nacimiento:
        try:
            fecha_nacimiento_dt = datetime.strptime(fecha_nacimiento, '%Y-%m-%d').date()
        except ValueError:
            return jsonify({"message": "Formato de fecha incorrecto (usar YYYY-MM-DD)"}), 400

    usuario_nuevo = Usuario(
        nombre=nombre,
        apellido=apellido,
        fecha_nacimiento=fecha_nacimiento_dt,
        genero=genero,
        email=email,
        usuario=usuario,
        password=hashed_password,
        rol=rol
    )
    db.session.add(usuario_nuevo)
    db.session.commit()
    return jsonify({"message": "Usuario creado correctamente"}), 201

@routes.route('/usuarios', methods=['GET'])
def listar_usuarios():
    usuarios = Usuario.query.all()
    return jsonify([
        {"id": u.id, "nombre": u.nombre, "email": u.email, "rol": u.rol}
        for u in usuarios
    ])

@routes.route('/usuarios/<int:id>', methods=['PUT'])
def actualizar_usuario(id):
    usuario = Usuario.query.get_or_404(id)
    data = request.json
    usuario.nombre = data.get("nombre", usuario.nombre)
    usuario.email = data.get("email", usuario.email)
    if "password" in data:
        usuario.password = generate_password_hash(data["password"], method='pbkdf2:sha256')
    usuario.rol = data.get("rol", usuario.rol)
    db.session.commit()
    return jsonify({"mensaje": "Usuario actualizado"})

@routes.route('/usuarios/<int:id>', methods=['DELETE'])
def eliminar_usuario(id):
    usuario = Usuario.query.get_or_404(id)
    db.session.delete(usuario)
    db.session.commit()
    return jsonify({"mensaje": "Usuario eliminado"})

# ==================================================
# 🧩 Ruta LOGIN (Funciona con email O nombre de usuario)
# ==================================================
@routes.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    identifier = data.get("email") 
    password = data.get("password")
    rol = data.get("role") or data.get("rol")

    if not all([identifier, password, rol]):
        return jsonify({"message": "Faltan datos (email/usuario, contraseña o rol)"}), 400

    user = Usuario.query.filter(
        or_(Usuario.email == identifier, Usuario.usuario == identifier)
    ).first()

    if user and check_password_hash(user.password, password) and user.rol == rol:
        return jsonify({
            "token": "jwt-token-generado",
            "role": user.rol,
            "user_id": user.id,
            "message": "Inicio de sesión exitoso"
        }), 200
    else:
        return jsonify({"message": "Credenciales inválidas"}), 401

@routes.route("/login/google", methods=["POST"])
def login_google():
    if not GOOGLE_LIBS_AVAILABLE:
        return jsonify({"message": "Librerías de Google OAuth no instaladas en el servidor."}), 500

    data = request.get_json()
    token = data.get("token")

    if not token:
        return jsonify({"message": "Falta el token de Google"}), 400

    try:
        idinfo = id_token.verify_oauth2_token(
            token, google_requests.Request(), CLIENT_ID
        )

        email = idinfo.get("email")
        nombre = idinfo.get("given_name", "Usuario") 
        apellido = idinfo.get("family_name", "") 
        
        if not email:
            return jsonify({"message": "Token de Google no contiene email."}), 401
        
        user = Usuario.query.filter_by(email=email).first()

        if user:
            return jsonify({
                "message": "Login con Google exitoso",
                "token": "jwt-google-token-generado", 
                "role": user.rol, 
                "user_id": user.id
            }), 200
        else:
            return jsonify({
                "message": "Usuario no registrado. Requiere selección de rol.",
                "email": email, 
                "nombre": nombre,
                "apellido": apellido
            }), 409

    except ValueError:
        return jsonify({"message": "Token de Google inválido o expirado"}), 401
    except Exception as e:
        print(f"Error en login de Google: {e}")
        return jsonify({"message": "Error interno del servidor en la verificación de Google."}), 500


@routes.route('/salones', methods=['POST'])
def crear_salon():
    data = request.json
    salon = Salon(nombre=data['nombre'], direccion=data.get('direccion'), capacidad=data.get('capacidad'))
    db.session.add(salon)
    db.session.commit()
    return jsonify({"mensaje": "Salón creado"}), 201

@routes.route('/salones', methods=['GET'])
def listar_salones():
    salones = Salon.query.all()
    return jsonify([{"id": s.salon_id, "nombre": s.nombre, "direccion": s.direccion, "capacidad": s.capacidad} for s in salones])

@routes.route('/salones/<int:id>', methods=['PUT'])
def actualizar_salon(id):
    salon = Salon.query.get_or_404(id)
    data = request.json
    salon.nombre = data.get("nombre", salon.nombre)
    salon.direccion = data.get("direccion", salon.direccion)
    salon.capacidad = data.get("capacidad", salon.capacidad)
    db.session.commit()
    return jsonify({"mensaje": "Salón actualizado"})

@routes.route('/salones/<int:id>', methods=['DELETE'])
def eliminar_salon(id):
    salon = Salon.query.get_or_404(id)
    db.session.delete(salon)
    db.session.commit()
    return jsonify({"mensaje": "Salón eliminado"})


@routes.route('/eventos', methods=['POST'])
def crear_evento():
    data = request.json
    evento = Evento(
        nombre_evento=data['nombre_evento'],
        fecha=datetime.strptime(data['fecha'], "%Y-%m-%d"),
        tema=data.get('tema'),
        informe=data.get('informe_detallado'),
        salon_id=data['salon_id'],
        usuario_id=data['cliente_id']
    )
    db.session.add(evento)
    db.session.commit()
    return jsonify({"mensaje": "Evento creado"}), 201

@routes.route('/eventos', methods=['GET'])
def listar_eventos():
    eventos = Evento.query.all()
    return jsonify([
        {
            "id": e.evento_id,
            "nombre_evento": e.nombre_evento,
            "fecha": e.fecha.isoformat(),
            "tema": e.tema,
            "informe": e.informe_detallado,
            "salon": e.salon.nombre,
            "cliente": e.usuario.nombre
        } for e in eventos
    ])

@routes.route('/eventos/<int:id>', methods=['PUT'])
def actualizar_evento(id):
    evento = Evento.query.get_or_404(id)
    data = request.json
    evento.nombre_evento = data.get("nombre_evento", evento.nombre_evento)
    if "fecha" in data:
        evento.fecha = datetime.strptime(data["fecha"], "%Y-%m-%d")
    evento.tema = data.get("tema", evento.tema)
    evento.informe = data.get("informe_detallado", evento.informe_detallado)
    db.session.commit()
    return jsonify({"mensaje": "Evento actualizado"})

@routes.route('/eventos/<int:id>', methods=['DELETE'])
def eliminar_evento(id):
    evento = Evento.query.get_or_404(id)
    db.session.delete(evento)
    db.session.commit()
    return jsonify({"mensaje": "Evento eliminado"})


@routes.route('/servicios', methods=['POST'])
def crear_servicio():
    data = request.json
    servicio = Servicio(nombre_servicio=data['nombre_servicio'], descripcion=data.get('descripcion'), costo=data.get('costo'))
    db.session.add(servicio)
    db.session.commit()
    return jsonify({"mensaje": "Servicio creado"}), 201

@routes.route('/servicios', methods=['GET'])
def listar_servicios():
    servicios = Servicio.query.all()
    return jsonify([{"id": s.servicio_id, "nombre_servicio": s.nombre_servicio, "descripcion": s.descripcion, "costo": str(s.costo)} for s in servicios])

@routes.route('/servicios/<int:id>', methods=['PUT'])
def actualizar_servicio(id):
    servicio = Servicio.query.get_or_404(id)
    data = request.json
    servicio.nombre_servicio = data.get("nombre_servicio", servicio.nombre_servicio)
    servicio.descripcion = data.get("descripcion", servicio.descripcion)
    servicio.costo = data.get("costo", servicio.costo)
    db.session.commit()
    return jsonify({"mensaje": "Servicio actualizado"})

@routes.route('/servicios/<int:id>', methods=['DELETE'])

def eliminar_servicio(id):
    servicio = Servicio.query.get_or_404(id)
    db.session.delete(servicio)
    db.session.commit()
    return jsonify({"mensaje": "Servicio eliminado"})


@routes.route('/eventos/<int:evento_id>/servicios', methods=['POST'])
def asignar_servicio(evento_id):
    data = request.json
    evento_servicio = EventoServicio(evento_id=evento_id, servicio_id=data['servicio_id'])
    db.session.add(evento_servicio)
    db.session.commit()
    return jsonify({"mensaje": "Servicio asignado al evento"}), 201

@routes.route('/eventos/<int:evento_id>/servicios', methods=['GET'])
def listar_servicios_evento(evento_id):
    servicios = EventoServicio.query.filter_by(evento_id=evento_id).all()
    return jsonify([
        {"servicio": s.servicio.nombre_servicio, "descripcion": s.servicio.descripcion, "costo": str(s.servicio.costo)}
        for s in servicios
    ])

@routes.route('/eventos_servicios/<int:id>', methods=['DELETE'])
def eliminar_evento_servicio(id):
    es = EventoServicio.query.get_or_404(id)
    db.session.delete(es)
    db.session.commit()
    return jsonify({"mensaje": "Servicio eliminado del evento"})


@routes.route('/pagos', methods=['POST'])
def registrar_pago():
    data = request.json
    pago = Pago(
        evento_id=data['evento_id'],
        monto=data['monto'],
        fecha_pago=datetime.strptime(data['fecha_pago'], "%Y-%m-%d"),
        metodo=data.get('metodo')
    )
    db.session.add(pago)
    db.session.commit()
    return jsonify({"mensaje": "Pago registrado"}), 201

@routes.route('/pagos', methods=['GET'])
def listar_pagos():
    pagos = Pago.query.all()
    return jsonify([
        {"id": p.pago_id, "evento": p.evento.nombre_evento, "monto": str(p.monto), "fecha_pago": p.fecha_pago.isoformat(), "metodo": p.metodo}
        for p in pagos
    ])

@routes.route('/pagos/<int:id>', methods=['PUT'])
def actualizar_pago(id):
    pago = Pago.query.get_or_404(id)
    data = request.json
    pago.monto = data.get("monto", pago.monto)
    if "fecha_pago" in data:
        pago.fecha_pago = datetime.strptime(data["fecha_pago"], "%Y-%m-%d")
    pago.metodo = data.get("metodo", pago.metodo)
    db.session.commit()
    return jsonify({"mensaje": "Pago actualizado"})

@routes.route('/pagos/<int:id>', methods=['DELETE'])
def eliminar_pago(id):
    pago = Pago.query.get_or_404(id)
    db.session.delete(pago)
    db.session.commit()
    return jsonify({"mensaje": "Pago eliminado"})


@routes.route('/contacto', methods=['POST'])
def handle_contacto():
    data = request.get_json()
    nombre = data.get('nombre')
    email = data.get('email')
    mensaje = data.get('mensaje')

    if not nombre or not email or not mensaje:
        return jsonify({"mensaje": "Faltan campos obligatorios."}), 400

    try:
        nuevo_contacto = Contacto(
            nombre=nombre,
            email=email,
            mensaje=mensaje
        )
        
        db.session.add(nuevo_contacto)
        db.session.commit()

        return jsonify({"mensaje": "Mensaje enviado y guardado con éxito!"}), 201

    except Exception as e:
        db.session.rollback()
        print(f"Error al guardar contacto: {e}")
        return jsonify({"mensaje": "Error interno del servidor al guardar el mensaje."}), 500


@routes.route('/contacto', methods=['GET'])
def get_contactos():
    try:
        contactos = Contacto.query.order_by(Contacto.fecha_envio.desc()).all()
        lista_contactos = [
            {
                "id": c.id,
                "nombre": c.nombre,
                "email": c.email,
                "mensaje": c.mensaje,
                "fecha_envio": c.fecha_envio.strftime('%Y-%m-%d %H:%M:%S')
            } for c in contactos
        ]
        return jsonify(lista_contactos), 200

    except Exception as e:
        print(f"Error al obtener mensajes: {e}")
        return jsonify({"mensaje": "Error al obtener los mensajes."}), 500
    

@routes.route('/postulaciones', methods=['POST'])
def crear_postulacion():
    data = request.json

    nombre = data.get('nombre')
    email = data.get('email')
    telefono = data.get('telefono')
    localidad = data.get('localidad')
    edad = data.get('edad')
    genero = data.get('genero')
    especialidad = data.get('especialidad')
    experiencia = data.get('experiencia')
    cv_url = data.get('cv_url', '')

    campos_obligatorios = [nombre, email, telefono, localidad, edad, genero, especialidad, experiencia]
    if not all(campos_obligatorios):
        return jsonify({"error": "Faltan campos obligatorios para la postulación"}), 400

    try:
        connection = db.engine.raw_connection()
        cursor = connection.cursor()

        cursor.execute("""
            INSERT INTO postulaciones 
            (nombre, email, telefono, localidad, edad, genero, especialidad, experiencia, cv_url)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (nombre, email, telefono, localidad, edad, genero, especialidad, experiencia, cv_url))

        connection.commit()
        cursor.close()
        connection.close()

        return jsonify({"message": "Postulación enviada correctamente"}), 201
    except Exception as e:
        return jsonify({"error": "Error interno del servidor al procesar la postulación."}), 500

@routes.route('/postulaciones', methods=['GET'])
def obtener_postulaciones():
    connection = db.engine.raw_connection()
    cursor = connection.cursor()

    cursor.execute("SELECT id, nombre, email, telefono, localidad, edad, genero, especialidad, experiencia, cv_url, fecha_postulacion FROM postulaciones")
    rows = cursor.fetchall()

    cursor.close()
    connection.close()

    column_names = ["id", "nombre", "email", "telefono", "localidad", "edad", "genero", "especialidad", "experiencia", "cv_url", "fecha_postulacion"]
    postulaciones = []
    for row in rows:
        postulacion = dict(zip(column_names, row))
        postulaciones.append(postulacion)

    return jsonify(postulaciones), 200

#
# RUTAS QUE USAN APIs
#

@routes.route('/api/servicios', methods=['GET'])
def obtener_servicios_proveedor():
    proveedor_id = request.args.get("proveedor_id")
    if not proveedor_id:
        return jsonify({"error": "Falta el parámetro 'proveedor_id'."}), 400
    
    try:
        servicios = Servicio.query.filter_by(proveedor_id=proveedor_id).all()
        lista_servicios = [{
            "id": s.servicio_id, "nombre_servicio": s.nombre_servicio, "descripcion": s.descripcion, 
            "costo": str(s.costo), "proveedor_id": s.proveedor_id
        } for s in servicios]
        return jsonify(lista_servicios), 200
    except Exception as e:
        return jsonify({"error": "Error interno del servidor al obtener servicios."}), 500
    
@routes.route('/api/solicitudes', methods=['GET'])
def obtener_solicitudes():
    try:
        today = date.today()
        solicitudes = Evento.query.filter(Evento.fecha >= today).all()
        
        lista_solicitudes = [{
            "id": e.evento_id, "nombre_evento": e.nombre_evento, 
            "fecha_evento": e.fecha.strftime('%Y-%m-%d') if e.fecha else None,
            "salon_id": e.salon_id, "usuario_id": e.usuario_id
        } for e in solicitudes]
        return jsonify(lista_solicitudes), 200
    except Exception as e:
        return jsonify({"error": "Error interno del servidor al obtener solicitudes."}), 500
    
@routes.route('/api/mensajes', methods=['GET'])
def obtener_mensajes_proveedor():
    proveedor_id = request.args.get("proveedor_id")
    if not proveedor_id:
        return jsonify({"error": "Falta el parámetro 'proveedor_id'."}), 400

    try:
        mensajes_q = db.session.query(
            Mensaje.id, Mensaje.contenido, Mensaje.fecha_envio,
            Usuario.nombre.label('cliente_nombre')
        ).join(
            Usuario, Usuario.id == Mensaje.remitente_id
        ).filter(
            Mensaje.receptor_id == proveedor_id
        ).order_by(
            Mensaje.fecha_envio.desc()
        ).all()
        
        lista_mensajes = [{
            "id": m.id, "mensaje": m.contenido, 
            "fecha": m.fecha_envio.isoformat() if m.fecha_envio else None,
            "cliente_nombre": m.cliente_nombre
        } for m in mensajes_q]
        
        return jsonify(lista_mensajes), 200
    except Exception as e:
        return jsonify({"error": "Error interno del servidor al obtener mensajes."}), 500
    

@routes.route('/api/eventos/<int:evento_id>/ofertas', methods=['GET'])
def listar_ofertas_por_evento(evento_id):
    try:
        # Consulta para unir EventoServicio, Servicio y Usuario (Proveedor)
        ofertas_q = db.session.query(
            EventoServicio.id.label('evento_servicio_id'), # ID de la tabla de enlace para aceptar
            Servicio.nombre_servicio, 
            Servicio.costo, 
            Usuario.nombre.label('proveedor_nombre'),
            Evento.estado.label('estado_evento') # Obtener el estado actual del evento
        ).join(
            Servicio, Servicio.servicio_id == EventoServicio.servicio_id
        ).join(
            Usuario, Usuario.id == Servicio.proveedor_id
        ).join(
            Evento, Evento.evento_id == EventoServicio.evento_id
        ).filter(
            EventoServicio.evento_id == evento_id
        ).all()

        lista_ofertas = [{
            "id": o.evento_servicio_id, 
            "nombre_servicio": o.nombre_servicio, 
            "costo": str(o.costo),
            "proveedor_nombre": o.proveedor_nombre,
            "estado_evento": o.estado_evento
        } for o in ofertas_q]
        
        return jsonify(lista_ofertas), 200
    except Exception as e:
        print(f"Error al obtener ofertas: {e}")
        return jsonify({"error": "Error interno del servidor al obtener ofertas."}), 500
    
@routes.route('/api/ofertas_servicio/<int:evento_servicio_id>/aceptar', methods=['PUT'])
def aceptar_oferta_servicio(evento_servicio_id):
    evento_servicio = EventoServicio.query.get(evento_servicio_id)
    if not evento_servicio:
        return jsonify({"message": "Oferta de servicio no encontrada"}), 404

    try:
        # 1. Obtener el evento principal
        evento = Evento.query.get(evento_servicio.evento_id)
        
        if evento:
            # 2. Actualizar el estado del EVENTO a 'aprobado'
            evento.estado = 'aprobado' 
            db.session.commit()
            
            # NOTA: Para un sistema más avanzado, aquí se podría notificar al proveedor 
            # y tal vez eliminar las otras ofertas de EventoServicio para este Evento.

            return jsonify({
                "message": f"Servicio aceptado y Evento '{evento.nombre_evento}' marcado como 'aprobado'.",
                "evento_id": evento.evento_id
            }), 200
        else:
            return jsonify({"message": "Evento asociado no encontrado"}), 404
    except Exception as e:
        db.session.rollback()
        print(f"Error al aceptar oferta: {e}")
        return jsonify({"message": f"Error interno del servidor al aceptar el servicio: {e}"}), 500