const config = require('config');

module.exports = () => {
    if (!config.get('jwtPrivateKey')) {
        throw new Error('FETAL ERROR: jwtPrivateKey is not avaibale');
    }
}