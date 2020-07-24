// Requires
var express = require('express');
var app = express();

//Model User
var User = require('../models/user');

//===========================
//Obtener todos los usuarios
//============================
app.get('/', (request, response, next) => {

    User.find({}, 'name email img role')
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

//===========================
//Crear usuario POST
//============================
app.post('/',(req, resp)=>{
    var body = req.body;
    var user = new User({
        name: body.name,
        email: body.email,
        password: body.password,
        img: body.img,
        role: body.role
    });

    user.save( (err, userSave) =>{
        if (err){
            return resp.status(500).json({
                ok: false,
                mensaje: 'Error al crear Users',
                errors: err
            });
        }

        resp.status(201).json({
            ok: true,
            usuarios: userSave
        })
    });
});

module.exports = app;