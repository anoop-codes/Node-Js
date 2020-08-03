
/**
 * 
 * @param {*} handler : is a async func the asynMiddleware fun should also async and await ,
 * the same thiing is done my the express-async-errors package.. which monkey patch the follwing code
 */
module.exports = function (handler) {
    return async (req, res, next) => {
        try {
            //some code
            await handler(req, res, next);
        } catch (error) {
            next(error)
        }
    }
}
