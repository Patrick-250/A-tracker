//itemController.js
const Item = require("../models/itemModel");

exports.getItems = async (req, res) => {
  try {
    const items = await Item.find().populate("category");
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Error fetching items" });
  }
};

exports.createItem = async (req, res) => {
  try {
    const newItem = await Item.create(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ error: "Error creating item" });
  }
};
