"use strict";
const moment = require('moment')

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.addColumn("userToken", "expiredAt", {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: moment().add(30, 'days').toDate()
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("userToken", "expiredAt")
  },
};
