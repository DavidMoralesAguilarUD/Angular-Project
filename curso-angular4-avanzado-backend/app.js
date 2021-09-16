'use strict'

var express = require('express');

var app = express();

// cargar rutas

var user_routes = require('./routes/user');
var animal_routes = require('./routes/animal');

// middlewares de body-parser

app.use(express.urlencoded({extended:true}));
app.use(express.json());

// Comfigurar cabeceras y cors

// rutas base

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST,OPTIONS, PUT, DELETE');
    res.header('Allow','GET, POST, OPTIONS, PUT, DELETE');
    next();

});

app.use('/api', user_routes);
app.use('/api', animal_routes);


app.get('/probando', (req, res) =>{
    res.status(200).send({message: 'Este es el método probando'})
    

})

module.exports = app;