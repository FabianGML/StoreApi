const express = require('express');

const OrderServices = require('../services/order.service');
const validatorHandler = require('../middlewares/validator.handler');
const { createOrderSchema, getOrderSchema, addItemSchema } = require('../schemas/order.schema');

const router = express.Router();
const service = new OrderServices();

router.get('/', async (req, res) => {
    try {
        const orders = await service.find();
        res.json(orders);
    }catch (error){
        next(error);
    }
});

router.get('/:id', 
    validatorHandler(getOrderSchema, 'params') ,
    async (req, res, next) => {
    try{
        const { id } = req.params;
        const order = await service.findOne(id)
        res.json(order);
    } catch (error){
        next(error);
    }

});

router.post('/', 
    validatorHandler(createOrderSchema, 'body'),
    async (req, res) => {
    const body = req.body;
    const newOrder = await service.create(body)
    res.status(201).json(newOrder)
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const order = await service.delete(id);
    res.json(order);
});

router.post('/add-item', 
    validatorHandler(addItemSchema, 'body'),
    async (req, res) => {
    const body = req.body;
    const newItem = await service.addItem(body)
    res.status(201).json(newItem)
});

module.exports = router;