const express = require("express");
const router = express.Router();
const {
  getInventoryItems,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
} = require("../Controllers/inventoryController");

// Endpoint to get all assets
router.get("/", getInventoryItems);

// Endpoint to add a new asset
router.post("/", createInventoryItem);

// Endpoint to update an asset
router.put("/:id", updateInventoryItem);

// Endpoint to delete an asset
router.delete("/:id", deleteInventoryItem);

module.exports = router;
