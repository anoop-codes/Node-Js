const Joi = require('joi');
const mongoose = require('mongoose');

//schema
const cusotmerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 255,
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phoneNumber: {
        type: Number,
        required: true,
        min: 10
    }
});

//class
const Customer = mongoose.model('Customer', cusotmerSchema);


function validation(data) {
    const schema = {
        name: Joi.string().min(2).max(255).required(),
        isGold: Joi.bool(),
        phoneNumber: Joi.number().min(10).required()
    }
    return Joi.validate(data, schema);
}


exports.Customer = Customer;
exports.validation = validation;