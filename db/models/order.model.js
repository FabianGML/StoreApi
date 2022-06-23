const { Model, DataTypes, Sequelize} = require('sequelize');

const { CUSTOMER_TABLE} = require('./customer.model');

const ORDER_TABLE = 'orders';

const OrderSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    customerId: {
        field: 'customer_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: CUSTOMER_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
    },
    total: {
        type: DataTypes.VIRTUAL, //Con esto generas un campo que no existira en la tabla de la bd
        get() {
            if(this.items.length > 0){
                return this.items.reduce((total, item) => {
                    return total + (item.price * item.OrderProduct.amount);
                }, 0)
            }  
            return 0 
            }
    }
}
    



class Order extends Model {
    //Este metodo es el que se encarga de las asociaciones del modelo 
    static associate(models) {
        this.belongsTo(models.Customer, { as: 'customer' });
        this.belongsToMany(models.Product, {
            as: 'items',
            through: models.OrderProduct,
            foreignKey: 'orderId',
            otherKey: 'productId',
        })
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: ORDER_TABLE,
            modelName: 'Order',
            timestamps: false,
        }
    }
}

module.exports = { ORDER_TABLE, OrderSchema, Order };