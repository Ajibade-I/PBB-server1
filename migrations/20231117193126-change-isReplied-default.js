"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Messages", "isReplied", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false, // Considering the column should not allow NULL values
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Messages", "isReplied", {
      type: Sequelize.BOOLEAN,
      defaultValue: null, // Revert back to the previous default value (if applicable)
      allowNull: true, // Adjust allowNull based on your previous column definition
    });
  },
};
