CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    genero VARCHAR(20) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(200) NOT NULL,
    rol VARCHAR(50) NOT NULL

    /*reset_token VARCHAR(255),
    reset_token_expira DATETIME ===> Funcion para recuperar la contraseña*/
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

-- Tabla eventos_servicios (tabla intermedia)
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

CREATE TABLE contactos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    mensaje TEXT NOT NULL,
    fecha_envio DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE postulaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    email VARCHAR(150),
    localidad VARCHAR(100),
    especialidad VARCHAR(100),
    experiencia TEXT,
    edad INT,
    genero VARCHAR(20),
<<<<<<< HEAD
    cv_url VARCHAR(255),
    fecha_postulacion DATETIME DEFAULT CURRENT_TIMESTAMP
);
=======
    cv_url VARCHAR(255), -- almacena la ruta del archivo PDF subido
    comentarios TEXT,
    fecha_postulacion DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE notificaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    mensaje TEXT,
    leido BOOLEAN DEFAULT FALSE,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
>>>>>>> bcf0959d203530ab77fc6217c5dd9542cefe912d

CREATE TABLE notificaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    mensaje TEXT,
    leido BOOLEAN DEFAULT FALSE,
    fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
