const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'cliente'
});

connection.connect((error) => {
  if (error) {
    console.log('Error al conectarse a la base de datos:', error);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Leer todos
app.get('/clientes', (req, res) => {
    connection.query('SELECT * FROM clientes', (error, results) => {
      if (error) throw error;
      res.send(results);
    });
  });


// Leer un cliente por ID
app.get('/clientes/:id', (req, res) => {
    const { id } = req.params;
    connection.query(`SELECT * FROM clientes WHERE id=${id}`, (error, results) => {
      if (error) throw error;
      res.send(results[0]);
    });
  });

  // Crear un nuevo cliente
app.post('/clientes', (req, res) => {
    const {nombre,correo,telefono,direccion,creado } = req.body;
    connection.query(`INSERT INTO clientes (nombre,correo,telefono,direccion,creado) VALUES ('${nombre}','${correo}','${telefono}','${direccion}', '${creado}')`, (error, results) => {
      if (error) throw error;
      res.send('Registro creado exitosamente');
    });
  });


  // Actualizar un cliente existente
app.put('/clientes/:id', (req, res) => {
    const { id } = req.params;
    const { nombre,correo,telefono,direccion,creado } = req.body;
    connection.query(`UPDATE clientes SET nombre='${nombre}', correo='${correo}', telefono='${telefono}', 
    direccion='${direccion}', creado='${creado}' WHERE id=${id}`, (error, results) => {
      if (error) throw error;
      res.send('Registro actualizado exitosamente');
    });
  });

  // Eliminar un cliente 
app.delete('/clientes/:id', (req, res) => {
    const { id } = req.params;
    connection.query(`DELETE FROM clientes WHERE id=${id}`, (error, results) => {
      if (error) throw error;
      res.send('Cliente eliminado exitosamente');
    });
  });
app.listen(3000, () => {
    console.log('API escuchando en el puerto 3000');
  });

