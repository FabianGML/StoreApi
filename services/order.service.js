const boom = require('@hapi/boom');//Libreria para manejar errores, respetando el status code
const { models } = require('../libs/sequelize');

class OrderService {
    
    constructor(){}

    async create(userId){
        const user = await this.findByUser(parseInt(userId));
        const customerId = user[0].dataValues.customerId
        const newOrder = await models.Order.create({
            customerId
        })
        return newOrder;    
    }

    async addItem(data) {
        const newItem = await models.OrderProduct.create(data);
        return newItem;
    }

    async find(){
        const rta = await models.Order.findAll();
        return rta;
    }

    async findByUser(userId){
        const orders = await models.Order.findAll({
            where: {
                //De esta forma se hacen consultas where, cuando son asociaciones 
                '$customer.user.id$': userId
            },
            include: {
                association: 'customer',
                include:['user']
            }
        });
        return orders;
    }

    async findOne(id){
        const order = await models.Order.findByPk(id, {
            include: [
            {
                association: 'customer',
                include: 'user'
            },
            'items'
        ]
        });
        if (!order) {
            throw boom.notFound('Order not found');
        }
        return order;
    }

    async update(id, changes){
        const order = await this.findOne(id);
        const rta = await order.update(changes);
        return rta;
    }

    async delete(id){
        const order = await this.findOne(id);
        await order.destroy();
        return { rta: true };
    }
}

module.exports = OrderService;