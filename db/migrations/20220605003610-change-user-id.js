'use strict';
const { Model, DataTypes, Sequelize} = require('sequelize');

const { CustomerSchema, CUSTOMER_TABLE } = require('./../models/customer.model');

module.exports = {
  async up (queryInterface) {
    await queryInterface.changeColumn(CUSTOMER_TABLE, 'user_id', {
      field: 'user_id',
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: true,
    })
  },

  async down (queryInterface) {
    //await queryInterface.drop(CUSTOMER_TABLE);
  }
};
