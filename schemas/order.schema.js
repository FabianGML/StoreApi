const Joi = require('joi');


const id = Joi.number().positive().required();
const customerId = Joi.number().positive();
const orderId = Joi.number().positive();
const productId = Joi.number().positive();
const amount = Joi.number().positive().min(1);



const createOrderSchema = Joi.object({
    customerId: customerId.required(),
});

const getOrderSchema = Joi.object({
    id: id.required(),
});

const addItemSchema = Joi.object({
    orderId: orderId.required(),
    productId: productId.required(),
    amount: amount.required(),
});


module.exports = { createOrderSchema, getOrderSchema, addItemSchema };