'use strict'

var mongoose = require('mongoose');
var app = require('./app')
var port = process.env.PORT || 3789; 

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/zoo', { useNewUrlParser: true })
        .then(() => {
            console.log('La conexión a la base de datos zoo se ha realizado correctamente...');
            app.listen(port, () => {
                console.log("El servidor local con Node y Express esta corriendo...");
            })
        })
        .catch(err => console.log(err))
}
