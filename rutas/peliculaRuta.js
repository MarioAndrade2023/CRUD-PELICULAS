'use strict'
var express = require('express');
var peliculaControl = require('../control/peliculaControl');
var api = express.Router();

api.post('/', peliculaControl.registrarPelicula);
api.get('/', peliculaControl.obtenerPeliculas);
api.get('/:id', peliculaControl.obtenerPelicula); // Ruta para obtener una sola película
api.put('/:id', peliculaControl.actualizarPelicula);
api.delete('/:id', peliculaControl.eliminarPelicula);

module.exports = api;