'use strict'

var mongoose = require('mongoose');
const { Schema } = mongoose;

const AnimalsSchema = new Schema({
    name: String,
    description: String,
    year: Number,
    image: String,
    user: { type: Schema.ObjectId, ref: 'User'}
  
});

module.exports = mongoose.model('Animal', AnimalsSchema);