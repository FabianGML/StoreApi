const { User, UserSchema } = require('./user.model');
const { Customer, CustomerSchema } = require('./customer.model');
const { Product, ProductSchema } = require('./product.model');
const { Category, CategorySchema } = require('./category.model');

/* Esta funcion recive todos los modelos que tengamos, para centralizarlos, esta funcion se corre en sequelize.js Esto se hace para que el ORM pueda hacer
modificaciones a la base de datos 
*/
function setupModels(sequelize) {
    // Modelo de usuario donde se define que campos tendra y que tipo de datos contendra cada campo
    User.init(UserSchema, User.config(sequelize));
    //Modelo de "Customer" con una relacion belongsTo a User 
    Customer.init(CustomerSchema, Customer.config(sequelize));
    //Modelo de product
    Product.init(ProductSchema, Product.config(sequelize));
    //Modelo de category
    Category.init(CategorySchema, Category.config(sequelize));

    //Las asociaciones se ponen al final de todos los inits
    User.associate(sequelize.models)
    Customer.associate(sequelize.models)
    Category.associate(sequelize.models)
    Product.associate(sequelize.models)
};

module.exports = setupModels;