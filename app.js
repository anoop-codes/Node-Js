const express = require('express');

//creating the app through express
const app = express();

//parse the req body into json
app.use(express.json());



//router
app.use('/api/genres', require('./routers/genres'));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening to PORT : ${PORT}`))
