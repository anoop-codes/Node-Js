const mongoose = require('mongoose');
const Joi = require('joi');

//schema
const genreSchema = new mongoose.Schema({
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

const Genre = mongoose.model('genre', genreSchema);


function genreValidate(data) {
    const schema = {
        name: Joi.string().min(1).max(255).required()
    }

    return Joi.validate(data, schema)
}

exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.genreValidate = genreValidate;