const mongoose = require('mongoose');
const Joi = require('joi');

//schema : define the shape of the doucment in the collection
const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        // match: 'regular express',
        maxlength: 255,
        minlength: 5
    },
    category: {
        type: String,
        enum: ['backend', 'fronend'] //other then this value will give error
    },
    author: {
        type: String,
        unique: true,
        validate: {
            isAsync: true,
            validator: function (v, callback) {
                setTimeout(function () {
                    //...logic
                    callback('is unique...')
                }, 1000)
            },
            message: 'author name is already taken'
        }
    },
    date: {
        type: Date,
        default: Date.now
    },
    tags: {
        type: Array,
        validate: {
            validator: function (v) {
                return v.length > 0
            },
            message: 'tag should have alteast one tag'
        }

    },
    isPublished: {
        type: Boolean
    },
    price: {
        type: Number,
        min: 0,
        max: 100000,
        get: (v) => Math.round(v),
        set: (v) => Math.round(v),
        required: function () {//arrow func is used here
            return this.isPublished
        }
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