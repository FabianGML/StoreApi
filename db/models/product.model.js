const { Model, DataTypes, Sequelize} = require('sequelize');

const { CATEGORY_TABLE } = require('./category.model');

const PRODUCT_TABLE = 'product';

const ProductSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },

    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },

    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },

    price: {
        allowNull: false,
        type: DataTypes.INTEGER
    },

    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
    },

    categoryId: {
        field: 'category_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: CATEGORY_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
    },
}
class Product extends Model {
    //Este metodo es el que se encarga de las asociaciones del modelo 
    static associate(models) {
        this.belongsTo(models.Category, {as: 'category'})
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: PRODUCT_TABLE,
            modelName: 'Product',
            timestamps: false,
        }
    }
}

module.exports = { PRODUCT_TABLE, ProductSchema, Product };