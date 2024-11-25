// models/inventoryModel.js
const { DataTypes } = require("sequelize");
const sequelize = require("../dataBase/db");

const Inventory = sequelize.define("Inventory", {
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  assetNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  assetLocation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cordIntegrity: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  groundWireResistance: {
    type: DataTypes.STRING,
  },
  groundLeakageCurrent: {
    type: DataTypes.STRING,
  },
  chassisTouchCurrent: {
    type: DataTypes.STRING,
  },
  physicalIntegrity: {
    type: DataTypes.STRING,
  },
  polarity: {
    type: DataTypes.STRING,
  },
  continuityOfGroundTension: {
    // New field
    type: DataTypes.STRING,
  },
  ampacity: {
    type: DataTypes.STRING,
  },
});

module.exports = Inventory;
