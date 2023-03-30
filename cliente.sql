create database cliente;
use cliente;
create table clientes(
    id int not null AUTO_INCREMENT PRIMARY KEY,
    nombre varchar(30) not null,
    correo varchar(50) not null,
    telefono varchar(30) not null,
    direccion varchar(40) not null,
    creado datetime not null
    );