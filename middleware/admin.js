const jwt = require('jsonwebtoken');
const config = require('config');

const admin = (req, res, next) => {
    if (!req.user.isAdmin) return res.status(403).send('Forbidden !!');

    next()
}

module.exports = admin;