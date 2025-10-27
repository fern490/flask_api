import json
import pytest
from pequeña_DB.templates.models import db, Usuario

def test_crear_usuario(client):
    data = {
        "nombre": "Carlos",
        "apellido": "López",
        "email": "carlos.lopez@example.com",
        "password": "123456",
        "rol": "admin"
    }

    response = client.post("/usuarios", data=json.dumps(data), content_type="application/json")
    assert response.status_code == 201
    json_data = response.get_json()
    assert "Usuario creado" in json_data["mensaje"]

def test_crear_usuario_email_duplicado(client):
    data = {
        "nombre": "Laura",
        "apellido": "Ramírez",
        "email": "laura.ramirez@example.com",
        "password": "password123",
        "rol": "cliente"
    }

    client.post("/usuarios", data=json.dumps(data), content_type="application/json")
    response = client.post("/usuarios", data=json.dumps(data), content_type="application/json")
    assert response.status_code == 409
    assert "ya está registrado" in response.get_json()["message"].lower()
