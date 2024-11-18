// Controllers/inventoryController.js
const Inventory = require("../models/inventoryModel");

// Get all inventory items
exports.getInventoryItems = async (req, res) => {
  try {
    const items = await Inventory.findAll();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Error fetching inventory items" });
  }
};

// Create a new inventory item
exports.createInventoryItem = async (req, res) => {
  try {
    const newItem = await Inventory.create(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ error: "Error creating inventory item" });
  }
};

// Update an inventory item
exports.updateInventoryItem = async (req, res) => {
  try {
    const updatedItem = await Inventory.update(req.body, {
      where: { id: req.params.id },
      returning: true,
      plain: true,
    });
    res.json(updatedItem[1]); // updatedItem[1] contains the updated record
  } catch (error) {
    res.status(400).json({ error: "Error updating inventory item" });
  }
};

// Delete an inventory item
exports.deleteInventoryItem = async (req, res) => {
  try {
    await Inventory.destroy({
      where: { id: req.params.id },
    });
    res.json({ message: "Item deleted" });
  } catch (error) {
    res.status(400).json({ error: "Error deleting inventory item" });
  }
};
