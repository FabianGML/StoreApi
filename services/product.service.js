const faker = require("faker");
const { Op } = require("sequelize");
const boom = require('@hapi/boom')//Libreria para manejar errores, respetando el status code

const { models } = require('../libs/sequelize');

class ProductsServices {
    
    constructor(){
        this.generate();
    }

    async generate() {
        
    }
    
    async create(data){
        const newProduct = await models.Product.create(data);
        return newProduct;
    }

    async find(query){
        const options = {
            include: ['category'],
            where: {}
        }
        const { limit, offset, price} = query;
        //Paginacion, si nos llegan los parametros query limit y offset, se hace una paginacion
        if(limit && offset){
            options.limit = limit;
            options.offset = offset;
        };

        if(price){
            options.where.price = price;
        };

        const { price_min, price_max } = query;
        if(price_min && price_max){
            options.where.price = {
                [Op.between]: [price_min, price_max]
            };
        };
        const products = await models.Product.findAll(options);
        return products;
        
    }

    async findOne(id){
        const product = await models.Product.findByPk(id);
        if(!product){
            throw boom.notFound('Product not found');
        }
        return product;
    }

    async update(id, changes){
        const product = await this.findOne(id);
        const rta = await product.update(changes);
        return rta;
    }

    async delete(id){
        const product = await this.findOne(id);
        await product.destory();
        return {rta: true };
    }
}

module.exports = ProductsServices;