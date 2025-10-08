CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    genero VARCHAR(20) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(200) NOT NULL,
    rol VARCHAR(50) NOT NULL
);

CREATE TABLE salones (
    salon_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(255),
    capacidad INT
);

CREATE TABLE eventos (
    evento_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_evento VARCHAR(255) NOT NULL,
    fecha DATE NOT NULL,
    tema VARCHAR(255),
    cantidad_personas INT,
    informe TEXT,
    estado ENUM('pendiente', 'aprobado', 'rechazado') DEFAULT 'pendiente',
    salon_id INT NOT NULL,
    usuario_id INT NOT NULL,
    CONSTRAINT fk_evento_salon FOREIGN KEY (salon_id) REFERENCES salones(salon_id),
    CONSTRAINT fk_evento_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE servicios (
    servicio_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_servicio VARCHAR(100) NOT NULL,
    descripcion TEXT,
    costo DECIMAL(10,2) NOT NULL.
    proveedor_id INT,
    FOREIGN KEY (proveedor_id) REFERENCES usuarios(id)
);

-- Crear tabla eventos_servicios (tabla intermedia)
CREATE TABLE eventos_servicios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    evento_id INT NOT NULL,
    servicio_id INT NOT NULL,
    CONSTRAINT fk_evento_servicio_evento FOREIGN KEY (evento_id) REFERENCES eventos(evento_id),
    CONSTRAINT fk_evento_servicio_servicio FOREIGN KEY (servicio_id) REFERENCES servicios(servicio_id),
    CONSTRAINT uq_evento_servicio UNIQUE (evento_id, servicio_id)
)

CREATE TABLE pagos (
    pago_id INT AUTO_INCREMENT PRIMARY KEY,
    evento_id INT NOT NULL,
    monto DECIMAL(10,2) NOT NULL,
    fecha_pago DATE NOT NULL,
    metodo_pago VARCHAR(50),
    CONSTRAINT fk_pago_evento 
    FOREIGN KEY (evento_id) REFERENCES eventos(evento_id)
);

CREATE TABLE mensajes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    remitente_id INT NOT NULL,
    receptor_id INT NOT NULL,
    contenido TEXT NOT NULL,
    fecha_envio DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (remitente_id) REFERENCES usuarios(id),
    FOREIGN KEY (receptor_id) REFERENCES usuarios(id)
);
