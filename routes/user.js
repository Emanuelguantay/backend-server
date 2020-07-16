// Requires
var express = require('express');
var app = express();

var Usuario = require('../models/user');

app.get('/', (request, response, next) => {

    Usuario.find({}, 'name email img role')
        .exec(
            (err, users) => {
                if (err){
                    return response.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando Users',
                        errors: err
                    });
                }
        
                response.status(200).json({
                    ok: true,
                    usuarios: users
                })
            }
        )
});

module.exports = app;