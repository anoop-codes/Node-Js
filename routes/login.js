const express = require('express');
const { userValidation, User } = require('../models/user');
const _ = require('lodash');
const bcrypt = require('bcrypt');

const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = userValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const isRegistered = await User.findOne({ email: req.body.email });
        if (!isRegistered) return res.status(400).send('User Donot exist,register First..');

        const isValid = await bcrypt.compare(req.body.password, isRegistered.password);
        if (!isValid) return res.status(400).send('Please provide the right password...');

        const token = isRegistered.generateAuthToken()

        res.status(200).send({
            msg: 'successFully login !!',
            token
        })

    } catch (error) {
        res.send(error)
    }
});

module.exports = router;