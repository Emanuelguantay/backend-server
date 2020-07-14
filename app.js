// Requires
var express = require('express');
//const { request, response } = require('express');
var mongoose = require('mongoose');

//Inicializar variables
var app = express();


//Conexion a la Base de Datos
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', ( error, response) =>{
    if (error) throw error;

    console.log('Base de datos: \x1b[32m%s\x1b[0m','online');
});


//Rutas
app.get('/', (request, response, next) => {

    response.status(200).json({
        ok: true,
        mensaje: 'Peticion realizada correctamente'
    });
});


//Escuchar peticiones

app.listen(3000, () => {
    console.log('Express serve puerto 3000: \x1b[32m%s\x1b[0m','online');
});