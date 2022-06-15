const Joi = require('joi');


const id = Joi.number().positive().required();
const name = Joi.string().min(3).max(15);
const image = Joi.string().uri();

const createCategorySchema = Joi.object({
    name: name.required(),
    image: image.required(),
});

const updateCategorySchema = Joi.object({
    name,
    image,
})

const getCategorySchema = Joi.object({
    id,
});


module.exports = { createCategorySchema, updateCategorySchema, getCategorySchema };