const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const express = require('express');
const config = require('config');

const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const app = express();

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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

/**
 * transaction : a gp of action that should be perform , it all operation will be success and change the state or everything fail..
 *
 * 2-phase commint.. (transaction)
 */