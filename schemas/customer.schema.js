const Joi = require('joi');


const id = Joi.number().positive().required();
const name = Joi.string().min(3).max(30);
const lastName = Joi.string();
const phone = Joi.string();
const userId = Joi.number().positive().integer();


const createCustomerSchema = Joi.object({
    name : name.required(),
    lastName: lastName.required(),
    phone: phone.required(),
    userId: userId.required(),
});

const updateCustomerSchema = Joi.object({
    name,
    lastName,
    phone,
    userId,
})

const getCustomerSchema = Joi.object({
    id: id.required(),
});


module.exports = { createCustomerSchema, updateCustomerSchema, getCustomerSchema };