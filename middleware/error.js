const logger = require("../utils/logger");


module.exports = function (error, req, res, next) {
    //logging the errors...
    logger.log({
        level: 'info',
        message: error.message
    })

    //level
    /**
     * error
     * warn 
     * info
     * silly
     */
    res.status(500).send(error.message);
}