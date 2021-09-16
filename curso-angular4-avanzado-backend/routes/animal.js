'use strict'

var express = require('express');
var AnimalController = require('../controllers/animals');

var api = express.Router();

var md_auth = require('../middleware/autheticated');
var md_admin = require('../middleware/isadmin');

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './upload/animals'});


api.get('/pruebas-animales',md_auth.ensureAuth, AnimalController.pruebas);
api.post('/registerAnimal', [md_auth.ensureAuth, md_admin.isAdmin],AnimalController.saveAnimal);
api.get('/list_animals',AnimalController.getAnimales);
api.get('/animal/:id',AnimalController.getAnimal);
api.put('/update-animal/:id', [md_auth.ensureAuth, md_admin.isAdmin], AnimalController.updateAnimal);
api.post('/upload-image-animal/:id', [md_auth.ensureAuth, md_admin.isAdmin],AnimalController.uploadImage);
api.get('/get-image-animal/:imageFile', AnimalController.getimageFile);
api.delete('/delete-animal/:id', [md_auth.ensureAuth, md_admin.isAdmin], AnimalController.deleteAnimal);





module.exports = api;
