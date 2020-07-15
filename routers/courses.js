const express = require('express');
const Joi = require('joi');

const router = express.Router();

const courses = [
    { id: 1, name: "javaScript" },
    { id: 2, name: "C#" },
    { id: 3, name: "Node js" },
    { id: 4, name: "ANgular" },
]


router.get('/', (req, res) => {
    res.send(courses);
});


//router parameter
router.get('/:id', (req, res) => {

    const course = courses.find(c => c.id === +req.params['id']);
    if (!course) return res.status(404).send('Course Not Found');

    res.status(200).send({ data: course })
});


//post
router.post('/', (req, res) => {
    const { error } = validation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);

    res.status(200).send(course);
});


//put
router.put('/:id', (req, res) => {
    //check for post
    const course = courses.find(c => c.id === +req.params['id']);
    if (!course) return res.status(404).send('Course Not Found');

    //validation 
    const { error } = validation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //updating the course
    course.name = req.body.name;

    res.status(200).send(course);
});


//delete
router.delete('/:id', (req, res) => {
    //check for post
    const course = courses.find(c => c.id === +req.params['id']);
    if (!course) return res.status(404).send('Course Not Found');

    const index = courses.indexOf(course);

    courses.splice(index, 1);

    res.status(200).send(course);
});


function validation(data) {
    const schema = {
        name: Joi.string().min(1).required().label('NAME')
    }
    return Joi.validate(data, schema);
}


module.exports = router;
