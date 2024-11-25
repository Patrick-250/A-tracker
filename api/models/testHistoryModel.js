// models/testHistoryModel.js
const { DataTypes } = require("sequelize");
const sequelize = require("../dataBase/db");

const TestHistory = sequelize.define("TestHistory", {
  assetId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  cordIntegrity: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  groundWireResistance: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  groundLeakageCurrent: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  chassisTouchCurrent: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  physicalIntegrity: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  polarity: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  continuityOfGroundTension: {
    // New field
    type: DataTypes.STRING,
    allowNull: true,
  },
  ampacity: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = TestHistory;
