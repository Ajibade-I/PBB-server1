"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Members", "status", {
      type: Sequelize.ENUM("pending", "approved", "rejected"),
      defaultValue: "pending",
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Members", "status");
  },
};
