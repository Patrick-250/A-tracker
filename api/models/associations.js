// models/associations.js
const Inventory = require("./inventoryModel");
const TestHistory = require("./testHistoryModel");

Inventory.hasMany(TestHistory, { foreignKey: "assetId" });
TestHistory.belongsTo(Inventory, { foreignKey: "assetId" });
