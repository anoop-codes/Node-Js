const express = require('express');

//Create the appln using express
const app = express();


//api to get the parameter
app.get('/api/cousers/:id', (req, res) => {

    //by default id are typeOf string
    const id = + req.params['id'];

    res.send(`request id : ${id} `)
});


//api to get the queryParameter
app.get('/api/cousers', (req, res) => {

    const queryParams = req.query;

    res.send(`request id : ${JSON.stringify(queryParams)} `)
});


//creating the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening to the port : ${PORT}`));

/**
 * the port is dynamiclly assign in the porduction env. process.env.PORT : the environment varibale is the env, in which the appln run.we can set the value of the env from the outside.
 *
 * process : is a global object.
 *
 * to set the env varibale in mac use ,export (export PORT=5000).. and on window use set
 *
 */