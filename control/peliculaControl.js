'use strict'

var peliculaModelo = require('../modelo/peliculas.js');
var pelicula = new peliculaModelo();

function registrarPelicula(req, res) {
    var params = req.body;
    var pelicula = new peliculaModelo();
    console.log(params);
    pelicula.nombre = params.nombre;
    pelicula.genero = params.genero;
    pelicula.director = params.director;
    pelicula.anio = params.anio;

    if (pelicula.nombre != null && pelicula.genero != null && pelicula.director != null && pelicula.anio != null) {
        pelicula.save()
            .then(peliculaAlmacenada => {
                if (!peliculaAlmacenada) {
                    res.status(404).send({ message: 'No se ha registrado la película' });
                } else {
                    res.status(200).send({
                        id: peliculaAlmacenada._id,
                        nombre: peliculaAlmacenada.nombre,
                        genero: peliculaAlmacenada.genero,
                        director: peliculaAlmacenada.director,
                        anio: peliculaAlmacenada.anio
                    });
                    console.log(peliculaAlmacenada);
                }
            })
            .catch(err => {
                res.status(500).send({ message: 'Error al guardar la película', error: err.message });
            });
    } else {
        res.status(400).send({ message: 'Introduce todos los campos' });
    }
}

function actualizarPelicula(req, res) {
    var peliculaId = req.params.id;
    var update = req.body;

    peliculaModelo
        .findByIdAndUpdate(peliculaId, update, { new: true })
        .then(peliculaActualizada => {
            if (!peliculaActualizada) {
                res.status(404).send({ message: 'No se ha podido encontrar la película' });
            } else {
                res.status(200).send({ pelicula: peliculaActualizada });
            }
        })
        .catch(err => {
            res.status(500).send({ message: 'Error al actualizar la película en el servidor', error: err.message });
        });
}

function eliminarPelicula(req, res) {
    var peliculaId = req.params.id;

    peliculaModelo
        .findByIdAndDelete(peliculaId)
        .then(peliculaEliminada => {
            if (!peliculaEliminada) {
                res.status(404).send({ message: 'No se encontró la película' });
            } else {
                res.status(200).send({ message: 'Película eliminada correctamente', pelicula: peliculaEliminada });
            }
        })
        .catch(err => {
            res.status(500).send({ message: 'Error en el servidor al eliminar la película', error: err.message });
        });
}

function obtenerPeliculas(req, res) {
    peliculaModelo
        .find()
        .then(peliculas => {
            res.json(peliculas);
        })
        .catch(error => {
            console.log(error);
            res.status(500).send('Hubo un error');
        });
}

function obtenerPelicula(req, res) {
    var peliculaId = req.params.id;

    peliculaModelo
        .findById(peliculaId)
        .then(peliculaEncontrada => {
            if (!peliculaEncontrada) {
                res.status(404).send({ message: 'No se encontró la película' });
            } else {
                res.status(200).send({ pelicula: peliculaEncontrada });
            }
        })
        .catch(err => {
            res.status(500).send({ message: 'Error en el servidor al obtener la película', error: err.message });
        });
}

module.exports = {
    registrarPelicula,
    actualizarPelicula,
    eliminarPelicula,
    obtenerPeliculas,
    obtenerPelicula
}