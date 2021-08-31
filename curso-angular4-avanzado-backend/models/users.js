'use strict'

var mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    image: String,
    role: String
  
});

  module.exports = mongoose.model('User', UserSchema);