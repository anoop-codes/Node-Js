const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');

//custom debugger, controlled form the env file.
const logConsole = require('debug')('app:startup');
const dbConsole = require('debug')('app:db');

//Create the appln using express
const app = express();

//config
console.log(`APP NAME : ${config.get('app-name')}`);
console.log(`MAIL SERVER : ${config.get('mail.host')}`);
//setting the password of the mail server.
//console.log(`MAIL SERVER PASSWORD: ${config.get('mail_password')}`);


//Environment
console.log(`NODE_ENV : ${process.env.NODE_ENV}`);
console.log(`ENV THROUGH EXPRESS : ${app.get('env')}`);//by default return dev

if (app.get('env') === 'production') {
    //making all the console in production removed
    console.log = function () { }
}

//can be configured from outside export DEBUG=app:startup,app:db //all app:*
logConsole('startup console log');
dbConsole('db console');
console.log('normal console log');




/*
 * middlware is func that take the req object and response or pass it the next middleware.
 * app.use() , call this function , to install a function in the middleware pipeline.middleware func are called in 
 * sequencec
 */


//buid-in middleware 
app.use(express.json());
app.use(express.static('pubic')); //name of the folder , container images, css ...static assested, read Form the root of the file system.
app.use(express.urlencoded()); //key=value&key=value,Html form payload.. older style , convert into JSON

//custom milldlware
app.use((req, res, next) => {
    console.log('Logging...........');
    //to pass control to next middlw ware
    next();
});

//third party middleware
app.use(helmet());//sometings with header(secure the http header);
app.use(morgan('tiny'))//log the http request



//view engine , templating engine is used to send dynamic page to clint
app.set('view engine', 'pug');
//set the folders
app.set('views', './views');//default


//sending html to the client side
app.get('/', (req, res) => {

    res.render('index', { doc_title: 'Express APPlication', doc_message: 'working on it.....' })
})




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