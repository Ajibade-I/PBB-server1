"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    // Step 1: Drop the existing 'Donations' table
    return queryInterface.dropTable("Donations").then(() => {
      // Step 2: Create a new 'Donations' table with the desired columns
      return queryInterface.createTable("Donations", {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        currency: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        amount: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        fullName: {
          type: Sequelize.STRING,
        },
        phoneNumber: {
          type: Sequelize.STRING,
        },
        emailAddress: {
          type: Sequelize.STRING,
        },
        createdAt: {
          type: Sequelize.DATE,
        },
        updatedAt: {
          type: Sequelize.DATE,
        },
      });
    });
  },

  down: (queryInterface, Sequelize) => {
    // Step 1: Drop the 'Donations' table if needed (the reverse of the 'up' action)
    return queryInterface.dropTable("Donations");
  },
};
