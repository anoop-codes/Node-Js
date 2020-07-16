const express = require('express');
const mongoose = require('mongoose');

//creating the app through express
const app = express();

//connecting the DB
mongoose.connect('mongodb://localhost/CouresDB', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log(`DataBase Connected!!`)).catch(error => console.log(`Error While connecting the DataBase : ${error}`));


app.use(express.json());


//routers
app.use('/api/courses', require('./routers/courses'));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening to PORT : ${PORT}`))
