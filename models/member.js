"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    static associate(models) {
      Member.hasMany(models.Donations, {
        foreignKey: "memberId",
        as: "donation",
      });
    }
  }

  Member.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      emailAddress: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
      },
      dateOfBirth: {
        type: DataTypes.DATE,
        validate: {
          isDate: true, // Ensure it's a valid date
          isBefore: new Date().toISOString(), // Ensure the dateOfBirth is not in the future
        },
      },
      occupation: {
        type: DataTypes.STRING,
      },
      residentialAddress: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.STRING,
        enum: ["admin", "member"],
        defaultValue: "member",
      },
    },
    {
      sequelize,
      modelName: "Member",
    }
  );
  return Member;
};
