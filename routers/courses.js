const express = require('express');
const { validation, Course } = require('../models/course');

const router = express.Router();

//comparsion
/**
 * eg : equal
 * ne : not equal
 * gt : greater then
 * gte : greater then or equal
 * lt : less then
 * lte : less then or equal 
 * in 
 * nin : no in
 */

//logical operator
/**
 * or
 * and 
 */

//regular exp
/**
 * ^ : start with
 * $ : end with
 * .*xyz.* : containing
 * /i : case insensative
 */

//all data
router.get('/', async (req, res) => {
    const pageNumber = 2;
    const pageSize = 5;
    //api/coursed?pageNumber=2&pageSize=5

    try {
        const courses = await Course
            .find()

            //comparsion
            //.find({ price: { $gte: 200 } })
            // .find({ price: { $in: [50, 100, 200, 300] } })
            //.find({ price: { $gte: 50, $lt: 300 } })

            //logical operator
            // .find()
            // .or([{ price: { $gte: 400 } }, { author: 'Anoop' }])

            //reqularal expression
            //.find({ author: /.*mosh.*/i })

            //pagination
            // .skip((pageNumber - 1) * pageSize)
            // .limit(pageSize)


            .sort({ name: 1 }) //1 : ace order
        // .count() // send the count of doc that match this ceriteria
        // .select({ name: 1, price: 1 }) // only selected property is send


        res.status(200).send(courses);
    } catch (error) {
        res.status(500).send(`Error while Fetching all the course , ${error}`);
    }
});


//router parameter
router.get('/:id', (req, res) => {

    const course = courses.find(c => c.id === +req.params['id']);
    if (!course) return res.status(404).send('Course Not Found');

    res.status(200).send({ data: course })
});


//post
router.post('/', async (req, res) => {
    const { error } = validation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const course = new Course({
        name: req.body.name,
        author: req.body.author,
        tags: req.body.tags,
        isPublished: req.body.isPublished,
        price: req.body.price
    });

    try {
        const result = await course.save();

        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(`Error while creating the course , ${error}`);
    }
});


//update : queryFirst
router.put('/qf/:id', async (req, res) => {
    //check for post
    const course = await Course.findById(req.params['id']);
    if (!course) return res.status(404).send('Course Not Found');

    //validation 
    const { error } = validation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //updating the course
    course.set({
        name: req.body.name,
        author: req.body.author,
        tags: req.body.tags,
        isPublished: req.body.isPublished,
        price: req.body.price
    })

    try {
        const result = await course.save();

        res.status(200).send(result);
    } catch (error) {
        res.status(500).send(`Error while upating the course , ${error}`);
    }
});

//update : updateFirst
router.put('/uf/:id', async (req, res) => {

    //check for post

    //can update multipal doc in one go
    // const course = await Course.update({isPubich : true});
    //check for post

    try {

        const course = await Course.findById(req.params['id']);
        if (!course) return res.status(404).send('Course Not Found');

        const updatedCourse = await Course.findByIdAndUpdate(req.params['id'], {
            //update object
            //$set
            //$int : directly in DB
            //$min , $max , $mul , $unset
            $set: {
                name: req.body.name,
                author: req.body.author,
                tags: req.body.tags,
                isPublished: req.body.isPublished,
                price: req.body.price
            }
        }, { new: true, useFindAndModify: false });

        res.status(200).send(updatedCourse);

    } catch (error) {
        res.status(500).send(`Error while upating the course , ${error}`);
    }
});


//delete
router.delete('/:id', async (req, res) => {
    //check for post
    try {
        const course = await Course.findById(req.params['id']);
        if (!course) return res.status(404).send('Course Not Found');

        //findByIdAndDelete ,findOneAndDelete : send the deleted obj
        //deleteOne : send the status of delete
        const result = await Course.deleteOne({ _id: req.params['id'] });

        res.status(200).send(result);

    } catch (error) {
        res.status(500).send(`Error while Deleting the course , ${error}`);
    }
});




module.exports = router;
