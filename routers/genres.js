const express = require('express');
const { Genre, validation } = require('../models/genres');

//router
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const genres = await Genre.find().sort('name');
        res.send({
            data: genres,
            status: 200
        });
    } catch (error) {
        res.send({
            error: `Error while getting the data : ${error}`,
            status: 500
        });
    }
});


//router parameter
router.get('/:id', (req, res) => {

    const genre = genres.find(c => c.id === +req.params['id']);
    if (!genre) return res.status(404).send('Course Not Found');

    res.status(200).send({ data: genre })
});


//post
router.post('/', (req, res) => {
    const { error } = validation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };
    genres.push(genre);

    res.status(200).send(genre);
});


//put
router.put('/:id', (req, res) => {
    //check for post
    const genre = genres.find(c => c.id === +req.params['id']);
    if (!genre) return res.status(404).send('Course Not Found');

    //validation 
    const { error } = validation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //updating the genre
    genre.name = req.body.name;

    res.status(200).send(genre);
});


//delete
router.delete('/:id', (req, res) => {
    //check for post
    const genre = genres.find(c => c.id === +req.params['id']);
    if (!genre) return res.status(404).send('Course Not Found');

    const index = genres.indexOf(genre);

    genres.splice(index, 1);

    res.status(200).send(genre);
});



module.exports = router;
