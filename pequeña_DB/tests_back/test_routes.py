import json
import uuid
import pytest
from pequeña_DB.templates.models import db, Usuario, Salon, Evento


def test_crear_usuario(client):
    """Prueba crear un usuario nuevo con email único (no borra la base existente)."""
    email_unico = f"carlos_{uuid.uuid4().hex}@example.com"  # Genera un email aleatorio
    usuario_unico = f"usuario_{uuid.uuid4().hex[:6]}"

    data = {
        "nombre": "Carlos",
        "apellido": "López",
        "email": email_unico,
        "usuario": usuario_unico,
        "password": "123456",
        "rol": "admin"
    }

    response = client.post("/usuarios", data=json.dumps(data), content_type="application/json")
    assert response.status_code == 201, f"Error: {response.get_json()}"
    json_data = response.get_json()
    assert "Usuario creado" in json_data["mensaje"]


def test_crear_usuario_email_duplicado(client):
    """Prueba que el backend devuelva 409 si el email ya existe."""
    email_repetido = f"laura_{uuid.uuid4().hex}@example.com"
    usuario_unico = f"usuario_{uuid.uuid4().hex[:6]}"

    data = {
        "nombre": "Laura",
        "apellido": "Ramírez",
        "email": email_repetido,
        "usuario": usuario_unico,
        "password": "password123",
        "rol": "cliente"
    }

    response1 = client.post("/usuarios", data=json.dumps(data), content_type="application/json")
    assert response1.status_code == 201, f"Error al crear el usuario inicial: {response1.get_json()}"

    response2 = client.post("/usuarios", data=json.dumps(data), content_type="application/json")
    assert response2.status_code == 409, f"Error: {response2.get_json()}"
    assert "ya está registrado" in response2.get_json()["mensaje"].lower()


def test_crear_salon(client):
    """Prueba crear un salón nuevo."""
    data = {
        "nombre": f"Salón Test {uuid.uuid4().hex[:6]}",
        "direccion": "Calle Falsa 123",
        "capacidad": 100
    }

    response = client.post("/salones", json=data)
    assert response.status_code == 201
    assert "Salón creado" in response.get_json()["mensaje"]


def test_crear_servicio(client):
    """Prueba crear un servicio con proveedor existente."""
    with client.application.app_context():
        proveedor = Usuario.query.filter_by(rol="proveedor").first()
        if not proveedor:
            proveedor = Usuario(
                nombre="Proveedor",
                apellido="Test",
                email=f"proveedor_{uuid.uuid4().hex}@example.com",
                usuario=f"prov_{uuid.uuid4().hex[:6]}",
                password="hashed",
                rol="proveedor"
            )
            db.session.add(proveedor)
            db.session.commit()

        data = {
            "nombre_servicio": f"Servicio Test {uuid.uuid4().hex[:6]}",
            "descripcion": "Servicio temporal de prueba",
            "costo": 5000,
            "proveedor_id": proveedor.id
        }

    response = client.post("/api/servicios", json=data)
    assert response.status_code == 201, f"Error: {response.get_json()}"
    assert "Servicio creado" in response.get_json()["message"]


def test_crear_evento(client):
    """Prueba crear un evento asociado a un usuario y un salón."""
    with client.application.app_context():
        salon = Salon.query.first()
        if not salon:
            salon = Salon(nombre="Salón Test", direccion="Calle Falsa 123", capacidad=100)
            db.session.add(salon)
            db.session.commit()

        usuario = Usuario.query.first()
        if not usuario:
            usuario = Usuario(
                nombre="Test",
                apellido="User",
                email=f"test{uuid.uuid4().hex[:6]}@example.com",
                usuario=f"user_{uuid.uuid4().hex[:6]}",
                password="hashed",
                rol="cliente"
            )
            db.session.add(usuario)
            db.session.commit()

        data = {
            "nombre_evento": f"Evento Test {uuid.uuid4().hex[:6]}",
            "fecha": "2025-12-01",
            "tema": "Evento de prueba",
            "informe": "informe",
            "salon_id": salon.salon_id,
            "cliente_id": usuario.id
        }

    response = client.post("/eventos", json=data)
    print("Response JSON:", response.get_json())
    assert response.status_code == 201
    assert "Evento creado" in response.get_json()["mensaje"]


def test_contacto(client):
    """Prueba que se pueda enviar un mensaje de contacto."""
    data = {
        "nombre": "Sofía",
        "email": f"sofia_{uuid.uuid4().hex}@example.com",
        "mensaje": "Hola, esto es una prueba automatizada."
    }

    response = client.post("/contacto", json=data)
    assert response.status_code == 201
    assert "guardado con éxito" in response.get_json()["mensaje"].lower()