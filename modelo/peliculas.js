var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EsquemaPeliculas = Schema({
    nombre: {
        type: String,
        required: true
    },
    genero:{
        type: String,
        required: true
    },
    director:{
        type: String,
        required: true
    },
    anio: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Peliculas', EsquemaPeliculas);