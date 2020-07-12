const express = require('express');
const router = express.Router();
const Joi = require('joi');

let genres = [
    { name: 'action', id: '100' },
    { name: 'romance', id: '101' },
    { name: 'sci-fi', id: '102' },
    { name: 'war', id: '103' },
    { name: 'thriller', id: '104' }
]

//get Genres
router.get('/', (req, res) => {

    res.status(200).send(genres);
});


//create Genres
router.post('/', (req, res) => {

    const { error } = generaValidate(req);
    if (error) return res.status(404).send(error.details[0].message);

    const isExist = genres.find((genre) => genre.name === req.body['name']);
    if (isExist) res.status(404).send(`${req.body.name} already exist`)

    genres = [...genres, {
        name: req.body.name,
        id: genres.length + 1
    }];

    res.status(200).send(genres)

});


//update Genres
router.put('/:id', (req, res) => {
    const id = req.params['id'];

    const { error } = generaValidate(req);
    if (error) return res.status(404).send(error.details[0].message);

    const isExistIndex = genres.findIndex((genre) => genre.id === id);

    if (isExistIndex < 0) return res.status(404).send(`${id} don't exist`);

    genres[isExistIndex].name = req.body.name;

    res.status(200).send(`genera successfully updated`)

});


//delete Genres
router.delete('/:id', (req, res) => {

});



function generaValidate(req) {
    const schema = {
        name: Joi.string().required()
    }

    return Joi.validate(req.body, schema)
}


module.exports = router;