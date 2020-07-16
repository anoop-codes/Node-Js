const mongoose = require('mongoose');
const Joi = require('joi');

//schema : define the shape of the doucment in the collection
const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    author: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    tags: {
        type: [String]
    },
    isPublished: {
        type: Boolean
    },
    price: {
        type: Number,
        get: (v) => Math.round(v),
        set: (v) => Math.round(v)
    }
});


//form schema a class is created of the above model
const Course = mongoose.model('Course', courseSchema);

function validation(data) {
    const schema = {
        name: Joi.string().min(1).required(),
        author: Joi.string().required(),
        tags: Joi.array(),
        isPublished: Joi.bool(),
        price: Joi.number()
    }
    return Joi.validate(data, schema);
}


exports.Course = Course;
exports.validation = validation;