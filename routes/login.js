var express = require('express');
var bcrypt = require('bcryptjs');

var app = express();

//Model User
var User = require('../models/user');


app.post('/', (req, resp)=>{
    var body = req.body;

    User.findOne({ email: body.email}, (err, userDB)=>{
    
        if (err){
            return resp.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }

        if ( !userDB ){
            return resp.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas - email',
                errors: err
            });
        }

        if ( !bcrypt.compareSync( body.password, userDB.password)){
            return resp.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas - password',
                errors: err
            });
        }

        //TODO: Crear tokken

        resp.status(200).json({
            ok: true,
            usuarios: userDB,
            id: userDB._id
        });
    })

    
})

module.exports = app;