'use strict';

const { USER_TABLE } = require('./../models/user.model');

module.exports = {
  async up (queryInterface, sequelize) {
    await  queryInterface.addColumn(USER_TABLE,'recovery_token', 
    {
      field: 'recovery_token',
      allowNull:true,
      type: sequelize.DataTypes.STRING,
    })
  },

  async down (queryInterface) {
    await queryInterface.removeColummn(USER_TABLE, 'reovery_token')
  }
};
