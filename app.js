const express = require('express');
const mongoose = require('mongoose');

//creating the app through express
const app = express();

//parse the req body into json
app.use(express.json());

//connecting the DB
mongoose.connect('mongodb://localhost/Project-Vidly', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log(`DataBase Connected!!`)).catch(error => console.log(`Error While connecting the DataBase : ${error}`));



//router
app.use('/api/genres', require('./routers/genres'));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening to PORT : ${PORT}`))
