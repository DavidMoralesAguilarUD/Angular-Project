'use strict'
var bcrypt = require('bcrypt-nodejs');
var fs = require('fs');
const path = require('path');

// modelos 
var User = require('../models/users');

// servicio jwt 

var jwt = require('../services/jwt');

// acciones

function pruebas(req, res) {
    res.status(200).send({
        message: 'Probando el controlador de usuarios y la acción pruebas'
    });
}

// Funcion que registra un usuario
function saveUser(req, res) {
    // Crear objeto usuario
    var user = new User();

    // Recoger parámetros petición
    var params = req.body

    if (params.password && params.name && params.surname && params.email) {
        //Asignar valores al objeto del usuario
        user.name = params.name;
        user.surname = params.surname;
        user.email = params.email;
        user.role = 'ROLE_USER';
        user.image = null;

        User.findOne({ email: user.email.toLowerCase() }, (err, issetUser) => {
            if (err) {
                res.status(500).send({ message: 'Error al comprobar el usuario' });
            } else {
                if (!issetUser) {
                    //Cifrar conrtraseña
                    bcrypt.hash(params.password, null, null, function (err, hash) {
                        user.password = hash;
                        // Guardar usuario en bd
                        user.save((err, userStored) => {
                            if (err) {
                                res.status(500).send({ message: 'Error al guardar el usuario' });
                            } else {
                                if (userStored) {
                                    res.status(200).send({ user: userStored })
                                } else {
                                    res.status(404).send({ message: 'Error al guardar el usuario' });
                                }
                            }
                        });
                    });
                } else {
                    res.status(500).send({
                        message: 'El usuario no puede registrarse, ya existe'
                    })
                }
            }
        });
    } else {
        res.status(200).send({
            message: 'Introduce los datos correctamente para poder registrar al usuario'
        });
    }
}

// Funcion para el login del usuari0

function login(req, res) {
    // req: trae los parámetros mediante el post
    // res: respuesta de la solicitud (req)
    var params = req.body;
    var email = params.email;
    var password = params.password;
    User.findOne({ email: email.toLowerCase() }, (err, user) => {
        if (err) {
            res.status(500).send({ message: 'Error al comprobar el usuario' });
        } else {
            if (user) {
                bcrypt.compare(password, user.password, (err, check) => {
                    if (check) {
                        if (params.getToken) {
                            // devolver el token  jwt
                            res.status(200).send({
                                token: jwt.createToken(user)
                            });
                        } else {
                            res.status(200).send({ user });
                        }

                    } else {
                        res.status(404).send({
                            message: 'El usuario no ha podido loguearse correctamente'
                        });
                    }

                });
            } else {
                res.status(404).send({
                    messsage: 'El usuario no ha podido loguearse'
                });
            }
        }
    });
}
// Función que actualiza un usuario
function updateUser(req, res) {
    var userId = req.params.id;
    var update = req.body;
    var params = req.body;
    delete update.password;

    if (params.name != '' && params.surname != '' && params.email && params.role) {
        // Si el id del usuario logueado es diferente al id del usuario viene de la url, entonces retornar error 500
        if (userId != req.user.sub) {
            return res.status(500).send({
                message: 'Permiso denegado'
            });
        } else {
            User.findByIdAndUpdate(userId, update, { new: true }, (err, userUpdated) => {
                if (err) {
                    res.status(500).send({
                        message: 'Error al actualizar usuario'
                    });

                } else {
                    if (userUpdated) {
                        res.status(200).send({
                            user: userUpdated
                            // Cuando existe un usuario en la base de datos
                        });
                    } else {
                        res.status(404).send({
                            message: 'No se ha podido actualizar el usuario'
                            // Cuando no existe el usuario en la base de datos Mongo
                        });
                    }
                }

            });
        }
    } else {
        if (params.role == 'ROLE_ADMIN') {
            res.status(404).send({
                messsage: 'El rol no puede ser ROLE_ADMIN, debe ser ROLE_USER'
            });
        }
    }


}

// Función que carga imagenes

function uploadImage(req, res) {

    var userId = req.params.id;
    var file_name = 'No subido...';
    var files = req.files;

    if (files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1]

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif') {
            console.log(userId);
            console.log(req.user.sub)
            if (userId != req.user.sub) {
                return res.status(500).send({ message: 'No tiene acceso denegado' });
            }
            User.findByIdAndUpdate(userId, { image: file_name }, { new: true }, (err, userUpdated) => {
                if (err) {
                    res.status(500).send({ message: 'Error al actualizar usuario' });
                } else {
                    if (userUpdated) {
                        res.status(200).send({ user: userUpdated, image: file_name });
                        // Cuando existe un usuario en la base de datos
                    } else {
                        res.status(404).send({ message: 'No se ha podido actualizar el usuario' });
                        // Cuando no existe el usuario en la base de datos Mongo
                    }
                }

            });
        } else {
            fs.unlink(file_path, (err) => {
                if (err) {
                    return res.status(200).send({ message: 'Extensión no valida y fichero no borrado' });
                } else {
                    return res.status(200).send({ message: 'Extensón no valida' });

                }
            })
        }
    } else {
        res.status(404).send({ messsage: 'No se han subido archivos' });
    }
}

// Función que obtiene imagenes
function getimageFile(req, res){
    var imageFile = req.params.imageFile;
    var path_file = './upload/users/'+imageFile;
    var path_error_image = './upload/users/NoImage.png';
    if(imageFile){
        fs.access(path_file, (err) =>{
            if(!err){
                res.status(200).sendFile(path.resolve(path_file));
            } else{
                if(err){
                    res.status(200).sendFile(path.resolve(path_error_image));

                }
                
                
            }
        })

    }

}
// Funcion que lista todos los cuidadores
function getkeepers(req, res){
    User.find({role:'ROLE_ADMIN'}).exec((err,users) =>{
        if(err){
            res.status(500).send({message: 'Error en la petición'});
        } else {
            if(!users){
                res.status(404).send({message: 'No hay cuidadores'});
            }else{
                res.status(200).send({users});
            }
        }
    })
}

module.exports = {
    pruebas,
    saveUser,
    login,
    updateUser,
    uploadImage,
    getimageFile,
    getkeepers
   
};