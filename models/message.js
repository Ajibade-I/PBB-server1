"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Message.init(
    {
      firstName: { type: DataTypes.STRING, allowNull: false },
      lastName: DataTypes.STRING,
      emailAddress: { type: DataTypes.STRING, allowNull: false },
      messageSubject: DataTypes.TEXT,
      message: { type: DataTypes.TEXT, allowNull: false },
      isReplied: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
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
