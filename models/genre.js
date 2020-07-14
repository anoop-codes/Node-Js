const mongoose = require('mongoose');
const Joi = require('joi');

//schema
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        minlength: 1,
        maxlength: 255
    }
});

const Genre = mongoose.model('genre', schema);


function genreValidate(data) {
    const schema = {
        name: Joi.string().min(1).max(255).required()
    }

    return Joi.validate(data, schema)
}


exports.Genre = Genre;
exports.genreValidate = genreValidate;