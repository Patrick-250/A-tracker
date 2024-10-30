//itemModel.js
const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  quantity: { type: Number, default: 0 },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("Item", itemSchema);
