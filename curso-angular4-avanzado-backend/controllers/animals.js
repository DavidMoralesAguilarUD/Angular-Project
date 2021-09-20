'use strict'
// modulos

var fs = require('fs');
const path = require('path');

// modelos 
var User = require('../models/users');
var Animal = require('../models/animals');


// acciones

function pruebas(req, res) {
    res.status(200).send({
        message: 'Probando el controlador de animales y la acción pruebas',
        user: req.user
    });
}

function saveAnimal(req, res){
    var animal = new Animal();

    var params = req.body;
    if(params.name){
        animal.name = params.name;
        animal.description = params.description;
        animal.year = params.year;
        animal.image = null;
        animal.user = req.user.sub;

        animal.save((err, animalStored) =>{
            if(err){
                res.status(500).send({message: 'Error en el servidor'});
            } else {
                if(!animalStored){
                    res.status(404).send({message: 'No se ha guardado el animal'});

                } else{
                    res.status(201).send({animal: animalStored});
                }
            }
        });

    } else {
        res.status(200).send({message: 'Nombre del animal es obligatorio'});
    }
}
// Función que lista todos los animales de un el animal
function getAnimales(req, res) {
    Animal.find({}).populate({ path: 'user' }).exec((err, animals) => {
        var names = []
        if (err) {
            res.status(500).send({
                message: 'Error en la petición'
            });
        } else {
            if (!animals) {
                res.status(404).send({
                    message: 'no hay animales'
                });

            } else {
                for (let i = 0; i < animals.length; i++) {
                    var element = animals[i];   
                    names.push(element.name)
                }
                Object.assign(names)       
                res.status(200).send({
                    //names,
                    animals
                    
                });
            }
        }

    });
}
// Funcion que lista un único animal

function getAnimal(req, res) {
    var animalId = req.params.id;
    Animal.findById(animalId).populate({ path: 'user' }).exec((err, animal) => {
        if (err) {
            res.status(500).send({
                message: 'Error en la petición'
            });
        } else {
            if (!animal) {
                res.status(404).send({
                    message: 'El animal no existe'
                });
            } else {
                console.log(animal.user)
                res.status(200).send({
                    animal
                });
            }
        }
    });
}

// Función que actualiza un el animal
function updateAnimal(req, res) {
    var animalId = req.params.id;
    var update = req.body;

    Animal.findByIdAndUpdate(animalId, update, { new: true }, (err, animalUpdated) => {
        if (err) {
            res.status(500).send({
                message: 'Error al actualizar el animal'
            });

        } else {
            if (animalUpdated) {
                res.status(200).send({animal: animalUpdated});
                    // Cuando existe un animal en la base de datos
            } else {
                res.status(404).send({message: 'No se ha podido actualizar el animal'});
                    // Cuando no existe el animal en la base de datos Mongo
            }
        }
    });

}

// Función que carga imagenes

function uploadImage(req, res) {

    var animalId = req.params.id;
    var file_name = 'No subido...';
    var files = req.files;

    if (files) {
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];
        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1]

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'gif') {
            Animal.findByIdAndUpdate(animalId, { image: file_name }, { new: true }, (err, animalUpdated) => {
                if (err) {
                    res.status(500).send({ message: 'Error al actualizar el animal' });
                } else {
                    if (animalUpdated) {
                        console.log(animalUpdated);
                        res.status(200).send({ animal: animalUpdated, image: file_name });
                        // Cuando existe un el animal en la base de datos
                    } else {
                        res.status(404).send({ message: 'No se ha podido actualizar el el animal' });
                        // Cuando no existe el el animal en la base de datos Mongo
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
    var path_file = './upload/animals/'+imageFile;
    if(imageFile){
        fs.access(path_file, (err) =>{
            if(!err){
                res.status(200).sendFile(path.resolve(path_file));
            } else{
                res.status(404).send({ messsage: 'La imagen no existe' });
            }
        })

    }

}

function deleteAnimal(req, res){
    var animalId = req.params.id;

    Animal.findByIdAndRemove(animalId, (err, animalRemoved) => {
        if(err){
            res.status(500).send({message: 'Error en la peticíon'});
        } else {
            if(!animalRemoved){
                res.status(404).send({animal: 'No se ha borrado el animal'});


            } else {
                res.status(200).send({animal: animalRemoved});
            }
      
      }
    })

}


module.exports ={
    pruebas,
    saveAnimal,
    getAnimales,
    getAnimal,
    updateAnimal,
    uploadImage,
    getimageFile,
    deleteAnimal
};