create database sis_atenciones;
use sis_atenciones;
CREATE TABLE Usuarios (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255),
    apellidos VARCHAR(255),
    email VARCHAR(320) UNIQUE, -- RFC 5322 suggests a maximum length of 320 for email
    password VARCHAR(255),
    estado TINYINT NOT NULL DEFAULT 1,
    rol VARCHAR(50) DEFAULT 'user',
    modalidad VARCHAR(50),
    createdAt TIMESTAMP,
    updatedAt TIMESTAMP
);

-- Atenciones Table
CREATE TABLE Atenciones (
    id_atencion INT PRIMARY KEY AUTO_INCREMENT,
    codigo_suministro VARCHAR(50),
    departamento VARCHAR(100),
    provincia VARCHAR(100),
    distrito VARCHAR(100),
    direccion VARCHAR(255),
    nombre_cliente VARCHAR(255),
    celular VARCHAR(9),
    email VARCHAR(320) null,
    modalidad VARCHAR(50),
    categoria VARCHAR(50),
    sub_categoria VARCHAR(50),
    petitorio VARCHAR(255),
    numero_atencion INT UNIQUE,
    fecha TIMESTAMP,
    id_usuario INT,
    estado TINYINT NOT NULL DEFAULT 1,
    createdAt TIMESTAMP,
    updatedAt TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id_usuario)
);