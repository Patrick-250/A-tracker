const express = require("express");
const router = express.Router();
const {
  getInventoryItems,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
  getRecentTestHistory,
  getAllTestHistory,
  saveTestResults,
} = require("../controllers/inventoryController");

// Endpoint to get all assets
router.get("/", getInventoryItems);

// Endpoint to add a new asset
router.post("/", createInventoryItem);

// Endpoint to update an asset
router.put("/:id", updateInventoryItem);

// Endpoint to delete an asset
router.delete("/:id", deleteInventoryItem);

// Endpoint to get recent test history for a specific asset
router.get("/:id/test-history/recent", getRecentTestHistory);

// Endpoint to get all test history for a specific asset
router.get("/:id/test-history/all", getAllTestHistory);

// Endpoint to save test results for a specific asset
router.put("/:id/test-history", saveTestResults);

module.exports = router;
