const express = require('express');
const { Customer, validation } = require('../models/customers');

//router
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const customers = await Customer.find().sort('name');
        res.status(200).send({
            data: customers,
            status: 200
        });
    } catch (error) {
        res.status(500).send({
            error: `Error while getting the customer : ${error}`,
            status: 500
        });
    }
});


//router parameter
router.get('/:id', (req, res) => {

    const customer = customers.find(c => c.id === +req.params['id']);
    if (!customer) return res.status(404).send('Customer Not Found');

    res.status(200).send({ data: customer })
});


//post
router.post('/', async (req, res) => {
    const { error } = validation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = new Customer({
        name: req.body.name,
        isGold: req.body.isGold,
        phoneNumber: req.body.phoneNumber
    });

    try {
        const result = await customer.save();
        res.status(200).send({
            data: result,
            status: 200
        });

    } catch (error) {
        res.status(500).send({
            error: `Error while creating the customer : ${error}`,
            status: 500
        });
    }
});


//put
router.put('/:id', async (req, res) => {
    try {
        //check for post
        const customer = await Customer.findById(req.params['id']);
        if (!customer) return res.status(404).send('Customer Not Found');

        //validation 
        const { error } = validation(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        //updating the customer
        customer.set({
            name: req.body.name,
            isGold: req.body.isGold,
            phoneNumber: req.body.phoneNumber
        })

        res.status(200).send({
            data: customer,
            status: 200
        });

    } catch (error) {
        res.status(500).send({
            error: `Error while updating the customer : ${error}`,
            status: 500
        });
    }
});


//delete
router.delete('/:id', async (req, res) => {
    //check for post
    try {
        const customer = await Customer.findById(req.params['id']);
        if (!customer) return res.status(404).send('Customer Not Found');

        const result = await Customer.findByIdAndDelete(req.params['id'])

        res.status(200).send({
            data: result,
            status: 200
        });
    } catch (error) {
        res.status(500).send({
            error: `Error while Deleting the customer : ${error}`,
            status: 500
        });
    }

});



module.exports = router;
