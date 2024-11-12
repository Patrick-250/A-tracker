// models/inventoryModel.js
const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  type: { type: String, required: true },
  date: { type: Date, required: true },
  assetNumber: { type: String, required: true },
  assetLocation: { type: String, required: true },
  cordIntegrity: { type: String, required: true },
  groundWireResistance: { type: String },
  groundLeakageCurrent: { type: String },
  chassisTouchCurrent: { type: String },
  physicalIntegrity: { type: String },
  polarity: { type: String },
  continuityOfGround: { type: String },
  groundTension: { type: String },
  ampacity: { type: String },
});

module.exports = mongoose.model("Inventory", inventorySchema);
