const { Model, DataTypes, Sequelize} = require('sequelize');

const CATEGORY_TABLE = 'category';

const CategorySchema = {
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

    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
    },
}
class Category extends Model {
    //Este metodo es el que se encarga de las asociaciones del modelo 
    static associate(models) {
        
        this.hasMany(models.Product/*Aqui se coloca el nombre del modelo que nosotros colocamos en el archivo (product)  */, { 
            as: 'products',
            foreignKey: 'categoryId' /*Aqui se coloca el atributo del modelo (en js no en la base de datos) con el cual lo estamos trabajando  */
        })
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: CATEGORY_TABLE,
            modelName: 'Category' /*Nombre del modelo con el que lo vamos a utilizar  */,
            timestamps: false,
        }
    }
}

module.exports = { CATEGORY_TABLE, CategorySchema, Category };