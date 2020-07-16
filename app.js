// Requires
var express = require('express');
//const { request, response } = require('express');
var mongoose = require('mongoose');

//Inicializar variables
var app = express();


//Importar Rutas
var appRoutes = require('./routes/app');
var userRoutes = require('./routes/user');


//Conexion a la Base de Datos
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', ( error, response) =>{
    if (error) throw error;

    console.log('Base de datos: \x1b[32m%s\x1b[0m','online');
});


//Rutas (Middleware)
app.use('/user', userRoutes);
app.use('/', appRoutes);


//Escuchar peticiones

app.listen(3000, () => {
    console.log('Express serve puerto 3000: \x1b[32m%s\x1b[0m','online');
});