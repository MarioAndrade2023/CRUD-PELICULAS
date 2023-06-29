const express = require('express');
const conectarDB = require('./config/db');
const bodyParser = require('body-parser');
const cors = require("cors");

// Creamos el servidor
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Conectamos a la BD
conectarDB();
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/peliculas', require('./rutas/peliculaRuta'));

// Puerto
const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log('El servidor está corriendo perfectamente en el puerto', port);
});