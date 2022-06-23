const Joi = require('joi');


const id = Joi.number().positive().required();
const name = Joi.string().min(3).max(25);
const price = Joi.number().integer().min(10);
const description = Joi.string().min(10);
const image = Joi.string().uri();
const categoryId = Joi.number().positive();


const price_min = Joi.number().integer();
const price_max = Joi.number().integer();

const limit = Joi.number().integer();
const offset = Joi.number().integer();


const createProductSchema = Joi.object({
    name: name.required(),
    price: price.required(),
    description : description.required(),
    image: image.required(),
    categoryId: categoryId.required(),
});

const updateProductSchema = Joi.object({
    name,
    price,
    description,
    image,
    categoryId
})

const getProductSchema = Joi.object({
    id,
});

const queryProductSchema = Joi.object({
    limit,
    offset,
    price,
    price_min,
    price_max: price_max.when('price_min', {
      is: Joi.exist(),
      then: Joi.required()
    })
  });

module.exports = { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema };