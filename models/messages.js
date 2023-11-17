"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {}
  }

  Message.init(
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
        validate: {
          isEmail: true,
        },
      },
      messageSubject: {
        type: DataTypes.TEXT,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      isReplied: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Message",
      paranoid: true,
    }
  );

  return Message;
};
