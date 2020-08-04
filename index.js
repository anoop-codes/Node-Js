//monkey patching the error package
require('express-async-errors');
const winston = require('winston');
const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const express = require('express');
const config = require('config');
const logger = require('./utils/logger');

const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const app = express();

//process raise/emit the error, with on we subsr the error
//this only work with only sync code and not with async error..
process.on('uncaughtException', (error) => {
  logger.log({ level: 'info', message: error.message });
});


//unhandle rejection
process.on('unhandledRejection', (error) => {
  logger.log({ level: 'info', message: error.message });
});

//it is not caught by the error middleware as it occure out side the context of express... 
throw new Error('something failed during the startup....');
const p = Promise.reject(new Error('promise error'));
p.then(() => { })



if (!config.get('jwtPrivateKey')) {
  console.log('FETAL ERROR: jwtPrivateKey is not avaibale');
  process.exit(1)
}

mongoose.connect('mongodb://localhost/vidly')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/register', require('./routes/register'));
app.use('/api/login', require('./routes/login'));
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);

//Error middleware
app.use(require('./middleware/error'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

/**
 * transaction : a gp of action that should be perform , it all operation will be success and change the state or everything fail..
 *
 * 2-phase commint.. (transaction)
 */