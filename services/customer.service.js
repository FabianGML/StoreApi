const boom = require('@hapi/boom');//Libreria para manejar errores, respetando el status code
const { models } = require('../libs/sequelize');

class CustomerService {
    
    constructor(){}

    async create(data){
        const newCustomer = await models.Customer.create(data)
        return newCustomer;    
    }

    async find(){
        
        const rta = await models.Customer.findAll({
            include: ['user']
        });
        return rta;
    }

    async findOne(id){
        const customer = await models.Customer.findByPk(id);
        if (!customer) {
            throw boom.notFound('Customer not found');
        }
        return custumer;
    }

    async update(id, changes){
        const customer = await this.findOne(id);
        const rta = await customer.update(changes);
        return rta;
    }

    async delete(id){
        const customer = await this.findOne(id);
        await customer.destroy();
        return { rta: true };
    }
}

module.exports = CustomerService;