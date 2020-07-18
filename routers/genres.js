const express = require('express');
const { Genre, validation } = require('../models/genres');

//router
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const genres = await Genre.find().sort('name').select();
        res.status(200).send({
            data: genres,
            status: 200
        });
    } catch (error) {
        res.status(500).send({
            error: `Error while getting the genre : ${error}`,
            status: 500
        });
    }
});


//router parameter
router.get('/:id', (req, res) => {

    const genre = genres.find(c => c.id === +req.params['id']);
    if (!genre) return res.status(404).send('Genre Not Found');

    res.status(200).send({ data: genre })
});


//post
router.post('/', async (req, res) => {
    const { error } = validation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = new Genre({
        name: req.body.name
    });

    try {
        const result = await genre.save();
        res.status(200).send({
            data: result,
            status: 200
        });

    } catch (error) {
        res.status(500).send({
            error: `Error while creating the genre : ${error}`,
            status: 500
        });
    }
});


//put
router.put('/:id', async (req, res) => {
    try {
        //check for post
        const genre = await Genre.findById(req.params['id']);
        if (!genre) return res.status(404).send('Genre Not Found');

        //validation 
        const { error } = validation(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        //updating the genre
        genre.set({
            name: req.body.name
        })

        res.status(200).send({
            data: genre,
            status: 200
        });

    } catch (error) {
        res.status(500).send({
            error: `Error while updating the genre : ${error}`,
            status: 500
        });
    }
});


//delete
router.delete('/:id', async (req, res) => {
    //check for post
    try {
        const genre = await Genre.findById(req.params['id']);
        if (!genre) return res.status(404).send('Genre Not Found');

        const result = await Genre.findByIdAndDelete(req.params['id'])

        res.status(200).send({
            data: result,
            status: 200
        });
    } catch (error) {
        res.status(500).send({
            error: `Error while Deleting the genre : ${error}`,
            status: 500
        });
    }

});



module.exports = router;
