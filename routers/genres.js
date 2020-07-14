const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { Genre, genreValidate } = require('../models/genre');


//get Genres
router.get('/', async (req, res) => {
    try {
        const genres = await Genre.find();
        res.status(200).send(genres);
    } catch (error) {
        res.status(500).send(error);
    }
});


//create Genres
router.post('/', async (req, res) => {

    const { error } = genreValidate(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    const isGenreExist = await Genre.findOne({ name: req.body.name });
    if (isGenreExist) return res.status(400).send(`${req.body.name} already exist`)

    const genre = new Genre({
        name: req.body.name
    })

    try {
        const result = await genre.save();
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send(error);
    }

});


//update Genres
router.put('/:id', async (req, res) => {
    const id = req.params['id'];

    const { error } = genreValidate(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    try {
        const genre = await Genre.findByIdAndUpdate({ _id: id }, {
            $set: {
                name: req.body.name
            }
        }, { new: true });

        if (!genre) return res.status(404).send(`inValid genre Id`);

        res.status(200).send(genre)

    } catch (error) {
        res.status(500).send("something went worng");
    }

});


//delete Genres
router.delete('/:id', async (req, res) => {
    try {
        const genre = await Genre.findOneAndDelete({ _id: req.params.id });

        if (!genre) return res.status(404).send(`inValid genre Id`);

        res.status(200).send(genre)
    } catch (error) {
        res.status(500).send("something went worng");
    }
});




module.exports = router;