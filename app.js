const express = require('express');
const mongoose = require('mongoose');

//Create the appln using express
const app = express();

//db commention
mongoose.connect('mongodb://localhost/Project-Vidly', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log(`MongoDB Connected Successfully !!!`)).catch((error) => console.log(`DataBase Connection Error : ${error} `));

//body parser
app.use(express.json())

//routers
app.use('/api/genres', require('./routers/genres'));
app.use('/api/movies', require('./routers/movies'));

//creating the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening to the port : ${PORT}`));
