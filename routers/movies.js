const express = require('express');
const { Movie, movieValidate } = require('../models/movie');
const { Genre } = require('../models/genre');
const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find().sort({ name: 1 });
        res.status(200).send(movies);
    } catch (error) {
        res.status(500).send(error);
    }
});



router.post('/', async (req, res) => {

    const { error } = movieValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send(`Invalid Genre.`)

    const movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });

    try {
        const result = await movie.save();
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send(error);
    }

});



router.put('/:id', async (req, res) => {
    const id = req.params['id'];

    const { error } = movieValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {

        const genre = await Genre.findById(req.body.genreId);
        if (!genre) return res.status(400).send(`Invalid Genre.`)


        const movie = await Movie.findByIdAndUpdate({ _id: id }, {
            $set: {
                title: req.body.title,
                genre: {
                    _id: genre._id,
                    name: genre.name
                },
                numberInStock: req.body.numberInStock,
                dailyRentalRate: req.body.dailyRentalRate
            }
        }, { new: true });

        if (!movie) return res.status(404).send(`inValid movie Id`);

        res.status(200).send(movie)

    } catch (error) {
        res.status(500).send("something went worng");
    }

});



router.delete('/:id', async (req, res) => {
    try {
        const movie = await Movie.findByIdAndDelete({ _id: req.params.id });

        if (!movie) return res.status(404).send(`inValid movie Id`);

        res.status(200).send(movie)
    } catch (error) {
        res.status(500).send("something went worng");
    }
});




module.exports = router;