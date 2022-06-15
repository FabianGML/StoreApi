const faker = require("faker");
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

    async find(){
        const products = await models.Product.findAll();
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