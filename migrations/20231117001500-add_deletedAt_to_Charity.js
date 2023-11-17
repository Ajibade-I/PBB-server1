"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add the new column 'deletedAt' to the 'Charity' table
    await queryInterface.addColumn("Charities", "deletedAt", {
      type: Sequelize.DATE,
      allowNull: true, // Modify allowNull according to your requirements
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Charities", "deletedAt");
  },
};
