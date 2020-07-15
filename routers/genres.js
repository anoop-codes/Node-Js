const express = require('express');
const Joi = require('joi');

const router = express.Router();

const genres = [
    { id: 1, name: "Action" },
    { id: 2, name: "Comedy" },
    { id: 3, name: "War" },
    { id: 4, name: "Darama" },
]


router.get('/', (req, res) => {
    res.send(genres);
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


function validation(data) {
    const schema = {
        name: Joi.string().min(1).required().label('NAME')
    }
    return Joi.validate(data, schema);
}


module.exports = router;
