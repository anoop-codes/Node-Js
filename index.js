const express = require('express');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const app = express();

//uncaught exception handling..
require('./startup/logging')();

//config
require('./startup/config')();

//db
require('./startup/db')();

app.use(express.json());
//routers
require('./startup/routes')(app);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

/**
 * transaction : a gp of action that should be perform , it all operation will be success and change the state or everything fail..
 *
 * 2-phase commint.. (transaction)
 */