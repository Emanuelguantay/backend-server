// Requires
var express = require('express');
var bcrypt = require('bcryptjs');

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
//ACTUALIZAR USUARIO PUT
//============================
app.put('/:id', (req, resp)=>{
    
    var id = req.params.id;
    var body = req.body;
    
    console.log(body)
    User.findById( id, (err, user) =>{
        if (err){
            return resp.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }

        if (!user){
            console.log("user");
            return resp.status(400).json({
                ok: false,
                mensaje: 'El usuario con el id'+ id+' no existe',
                errors: { message: 'No existe usuario con ese id'}
            });
        }

        user.name = body.name;
        user.email = body.email;
        user.role = body.role;

        user.save((err, userSave) =>{
            if (err){
                console.log("error", err);
                return resp.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar usuario',
                    errors: err
                });
            }

            userSave.password = '';

            resp.status(200).json({
                ok: true,
                usuarios: userSave
            });
        });  
    })
})

//===========================
//Crear usuario POST
//============================
app.post('/',(req, resp)=>{
    var body = req.body;
    var user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        role: body.role
    });

    user.save( (err, userSave) =>{
        if (err){
            return resp.status(400).json({
                ok: false,
                mensaje: 'Error al crear Users',
                errors: err
            });
        }

        resp.status(201).json({
            ok: true,
            usuarios: userSave
        });
    });
});

module.exports = app;