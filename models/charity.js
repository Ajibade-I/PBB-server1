"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Charities extends Model {
    static associate(models) {
      Charities.hasMany(models.Donations, {
        foreignKey: "charityId",
        as: "donations",
      });
    }
  }
  Charities.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
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
    {
      sequelize,
      modelName: "Charities",
      paranoid: true, // Enable paranoid mode for soft deletion
      timestamps: true, // You can also set timestamps to true if you want createdAt and updatedAt columns
    }
  );

  return Charities;
};
