const express = require('express');
const mongoose = require('mongoose');
const app = express();

//body parse
app.use(express.json());

//connecting mongoDn
mongoose.connect('mongodb://localhost/mongoDb-Demo', { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log(`MongoDB Connected Successfully !!!`)).catch((error) => console.log(`DataBase Connection Error : ${error} `));

//schema: define the shape of the document(row) in a collection(table)
const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        //match : regular exporessiomn
        lowercase: true,
        uppercase: false,
        unique: true,
        trim: true
    },
    author: {
        type: String,
        validate: {
            isAsync: true,
            validator: function (v, callback) {
                // some async work
                callback(
                    //.. some result)
                )
            },
            message: 'some async error message...'
        }
    },
    tags: {
        type: [String],
        //enum: ['angular', 'nodejs', 'reactjs', 'C#'],// the value should belong the only this mentioned value
        validate: {
            validator: function (v) {
                return v.length > 0
            },
            message: 'the tags length should be more then one'
        }
    },
    date: {
        type: Date,
        default: Date.now
    },
    price: {
        type: Number,
        required: function () {
            return this.isPublished //no arrow function, as arrow func don't have there wown this.this will refer to that function on which is called./or inside
        },
        min: 0,
        max: 5000,
        get: (v) => Math.round(v),
        set: (v) => Math.round(v)
    },
    isPublished: Boolean
});

const Course = mongoose.model('course', courseSchema);

/**
 * Query:
 * comparision operators:-
 * eq : equal
 * ne : (not equal)
 * gt : greater then
 * ghe : greater than equal to
 * lt : less then
 * lte : less then equal to
 * in 
 * nin : not in
 * 
 * 
 * Logical Operators
 * or 
 * and
 * 
 * 
 * regular expession
 * ^: START STRING  
 * $: END WITH A GIVEN STIRNG
 * .*string*. : constaining the string
 * 
 * 
 * /i : to make case insentive
 */

//get courses
app.get('/api/courses', async (req, res) => {
    const courses = await Course
        //.find({ one or  more value for filtering..   author: 'Anoop'})

        //Comparision Operator
        // .find({ price: { $eq: 100 } })
        // .find({ price: { $gte: 10, $lte: 300 } })
        // .find({ price: { $in: [10, 50, 300, 100] } })

        // Logical Operators
        //.or([{ author: 'mosh' }, { isPublished: true }])// same and is used

        //regular expession
        .find({ author: /.*mosh*./i })

        .limit(10) //limit the value sliced
        .sort({ name: 1 }) //1: accending order
        .select({ name: 1, tags: 1, price: 1, author: 1 }) // only select propery is selected
    res.status(200).send(courses)
})


//create courses
app.post('/api/courses', async (req, res) => {
    const course = new Course({
        name: req.body.name,
        author: req.body.author,
        tags: req.body.tags,
        price: req.body.price,
        isPublished: req.body.isPublished
    });

    try {
        const result = await course.save();
        res.status(200).send(result)
    } catch (error) {
        res.status(404).send(error)
    }
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening to the port : ${PORT}`));
