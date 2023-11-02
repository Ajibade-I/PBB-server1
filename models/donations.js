"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Donations extends Model {
    static associate(models) {
      Donations.belongsTo(models.Member, {
        foreignKey: "memberId",
        as: "donor",
      });
    }
  }
  Donations.init(
    {
      currency: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      fullName: {
        type: DataTypes.STRING,
      },
      phoneNumber: {
        type: DataTypes.STRING,
      },
      emailAddress: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Donations",
    }
  );
  return Donations;
};
