const express = require('express');
const { userValidation, User } = require('../models/user');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth');//authorization

const router = express.Router();


router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');

    res.send(user)
})


//registeration
router.post('/', async (req, res) => {
    const { error } = userValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const isRegistered = await User.findOne({ email: req.body.email });
        if (isRegistered) return res.status(400).send('User Already Exist, Please login..');

        //salt is a random string , added before or after this password
        const salt = await bcrypt.genSalt(10);
        const _hashPassword = await bcrypt.hash(req.body.password, salt);

        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: _hashPassword
        });

        await user.save();

        const token = user.generateAuthToken()

        res.header('x-auth-token', token).send({
            msg: 'successFully registered !!',
            data: _.pick(user, ['_id', 'username', 'email'])
        })

    } catch (error) {
        res.send(error)
    }
});

module.exports = router;