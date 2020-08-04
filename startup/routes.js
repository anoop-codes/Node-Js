module.exports = (app) => {
    app.use('/api/register', require('../routes/register'));
    app.use('/api/login', require('../routes/login'));
    app.use('/api/genres', require('../routes/genres'));
    app.use('/api/customers', require('../routes/customers'));
    app.use('/api/movies', require('../routes/movies'));
    app.use('/api/rentals', require('../routes/rentals'));
}