const winston = require('winston');

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'combined.log' })
    ]
});


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