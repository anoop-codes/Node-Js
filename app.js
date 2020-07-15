const express = require('express');
const router = require('./routers/courses');

//creating the app through express
const app = express();

//parse the req body into json
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Wel Come!!!!');
});


//query-Parametes
app.get('/api/resouces', (req, res) => {
    const queryParams = req.query;
    res.send(JSON.stringify(queryParams));
});

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
 */