const mongoose = require('mongoose');
const Joi = require('joi');
const { genreSchema } = require('./genre');

//schema
const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 255,
        minlength: 1
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    }
});

const Movie = mongoose.model('Movie', schema);


function movieValidate(data) {
    const schema = {
        title: Joi.string().min(1).max(255).required(),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().min(1).max(255).required(),
        dailyRentalRate: Joi.number().min(1).max(255).required()
    }

    return Joi.validate(data, schema)
}


exports.Movie = Movie;
exports.movieValidate = movieValidate;