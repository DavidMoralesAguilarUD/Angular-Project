'use strict'

var express = require('express');

var app = express();

// cargar rutas

var user_routes = require('./routes/user')

// middlewares de body-parser

app.use(express.urlencoded({extended:true}));
app.use(express.json());

// Comfigurar cabeceras y cors

// rutas base

app.use('/api', user_routes);

app.get('/probando', (req, res) =>{
    res.status(200).send({message: 'Este es el método probando'})

})

module.exports = app;