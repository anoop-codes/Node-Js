const Joi = require('joi');
const mongoose = require('mongoose');

//schema
const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 255,
        unique: true
    }
});

//class
const Genre = mongoose.model('Genre', genreSchema);


function validation(data) {
    const schema = {
        name: Joi.string().min(2).max(255).required()
    }
    return Joi.validate(data, schema);
}


exports.Genre = Genre;
exports.validation = validation;