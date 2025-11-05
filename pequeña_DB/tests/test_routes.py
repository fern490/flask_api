import json
import uuid
import pytest
from pequeña_DB.templates.models import db, Usuario, Salon


def test_crear_usuario(client):
    """Prueba crear un usuario nuevo con email único (no borra la base existente)."""
    email_unico = f"carlos_{uuid.uuid4().hex}@example.com" # Genera un email aleatorio

    data = {
        "nombre": "Carlos",
        "apellido": "López",
        "email": email_unico,
        "usuario": "usuario",
        "password": "123456",
        "rol": "admin"
    }

    response = client.post("/usuarios", data=json.dumps(data), content_type="application/json")
    assert response.status_code == 201, f"Error: {response.get_json()}"
    json_data = response.get_json()
    assert "Usuario creado" in json_data["mensaje"]

@pytest.mark.skip()
def test_crear_usuario_email_duplicado(client):
    """Prueba que el backend devuelva 409 si el email ya existe."""
    email_repetido = f"laura_{uuid.uuid4().hex}@example.com"

    data = {
        "nombre": "Laura",
        "apellido": "Ramírez",
        "email": email_repetido,
        "password": "password123",
        "rol": "cliente"
    }

    response1 = client.post("/usuarios", data=json.dumps(data), content_type="application/json")
    assert response1.status_code == 201, f"Error al crear el usuario inicial: {response1.get_json()}"

    response2 = client.post("/usuarios", data=json.dumps(data), content_type="application/json")
    assert response2.status_code == 409, f"Error: {response2.get_json()}"
    assert "ya está registrado" in response2.get_json()["message"].lower()

@pytest.mark.skip()
def test_registro_temporal(client):
    email_unico = f"temp_{uuid.uuid4().hex}@example.com"
    data = {
        "nombre": "Ana",
        "apellido": "García",
        "fecha_nacimiento": "1990-05-14",
        "genero": "Femenino",
        "email": email_unico,
        "rol": "cliente"
    }

    response = client.post("/registro-temporal", data=json.dumps(data), content_type="application/json")
    assert response.status_code == 201
    assert "¡Registro éxitoso!" in response.get_json()["message"]

@pytest.mark.skip()
def test_crear_salon(client):
    data = {
        "nombre": f"Salón Test {uuid.uuid4().hex[:6]}",
        "direccion": "Calle Falsa 123",
        "capacidad": 100
    }

    response = client.post("/salones", json=data)
    assert response.status_code == 201
    assert "Salón creado" in response.get_json()["mensaje"]

@pytest.mark.skip()
def test_crear_servicio(client):
    data = {
        "nombre_servicio": f"Servicio Test {uuid.uuid4().hex[:6]}",
        "descripcion": "Servicio temporal de prueba",
        "costo": 5000
    }

    response = client.post("/servicios", json=data)
    assert response.status_code == 201
    assert "Servicio creado" in response.get_json()["mensaje"]

@pytest.mark.skip()
def test_crear_evento(client):
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

@pytest.mark.skip()
def test_contacto(client):
    data = {
        "nombre": "Sofía",
        "email": f"sofia_{uuid.uuid4().hex}@example.com",
        "mensaje": "Hola, esto es una prueba automatizada."
    }

    response = client.post("/contacto", json=data)
    assert response.status_code == 201
    assert "guardado con éxito" in response.get_json()["mensaje"].lower()
