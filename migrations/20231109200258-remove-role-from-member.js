"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Members", "role");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("Members", "role", {
      type: Sequelize.STRING,
      enum: ["admin", "member"],
      defaultValue: "member",
    });
  },
};
