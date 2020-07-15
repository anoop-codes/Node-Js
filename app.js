const consoleLogger = require('debug')('app:logger');
const express = require('express');
const router = require('./routers/courses');
const auth = require('./middleware/auth');
const logging = require('./middleware/logging');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');

//creating the app through express
const app = express();

//Environment
//Process : it is global obj in node , that give access to current process
console.log(`Process Env : ${process.env.NODE_ENV}`);//can be set form out side, 
consoleLogger(`Express Env : ${app.get('env')}`);//byDefault it gove development
//config
console.log(`Name of the appliction : ${config.get('AppName')}`);
console.log(`Name of the dataBase : ${config.get('db')}`);
console.log(`apiKey : ${config.get('apiKey')}`)

//middlware
//parse the req body into json
app.use(express.json());
//to serve static files like css , images etc..
app.use(express.static('public'))
//custom middlware
app.use(logging);
app.use(auth);
//third party middleware
app.use(helmet());//secure the api header
app.use(morgan('tiny'));//help to log every http request


//templating engine
app.set('view engine', 'pug');
app.set('views', './views')//default

app.get('/', (req, res) => {
    res.render('index', { doc_title: 'My Express App', doc_discription: "wel Come" })
});

//query-Parametes
app.get('/api/resouces', (req, res) => {
    const queryParams = req.query;
    res.send(JSON.stringify(queryParams));
});

//routers
app.use('/api/courses', router);

//Port on which the Project run , PORT is the env varibale , in the process is running, 
//it's value is setout of the application.setting port export PORT=4000 (mac) , set PORT=4000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening to PORT : ${PORT}`))

/**
 * RestFull API : Representational State TransFer
 *
 * to perform CRUD operation.
 *
 * 404 : status : Object not found
 * 400 : status : bad resquest(where the validation failed of incoming req)
 *
 * middleware:
 *      a middleware is function that takes the req , and return the response or pass to next middleware,they are called in sequence
 *        -inbulid middleware express
 *        - custom middleware
 *        - third party middleware
 */