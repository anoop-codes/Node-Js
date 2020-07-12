const express = require('express');

//Create the appln using express
const app = express();

//body parser
app.use(express.json())

//routers
app.use('/api/genres', require('./routers/genres'));

//creating the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening to the port : ${PORT}`));
