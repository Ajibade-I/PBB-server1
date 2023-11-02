"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Charity extends Model {
    static associate(models) {
      Charity.hasMany(models.Donations, {
        foreignKey: "charityId",
        as: "donations",
      });
    }
  }
  Charity.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      goal: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        enum: ["completed", "ongoing"],
        defaultValue: "ongoing",
      },
      raised: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      no_of_sponsors: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      percentage: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
    },
    { sequelize, modelName: "Charity" }
  );

  return Charity;
};
