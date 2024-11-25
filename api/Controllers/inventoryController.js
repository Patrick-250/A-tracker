const Inventory = require("../models/inventoryModel");
const TestHistory = require("../models/testHistoryModel");

// Get all inventory items
exports.getInventoryItems = async (req, res) => {
  try {
    console.log("Fetching all inventory items...");
    const items = await Inventory.findAll();
    console.log("Inventory items fetched:", items);
    res.json(items);
  } catch (error) {
    console.error("Error fetching inventory items:", error);
    res.status(500).json({ error: "Error fetching inventory items" });
  }
};

// Create a new inventory item
exports.createInventoryItem = async (req, res) => {
  try {
    console.log("Creating new inventory item with data:", req.body);
    const newItem = await Inventory.create(req.body);
    console.log("New inventory item created:", newItem);
    res.status(201).json(newItem);
  } catch (error) {
    console.error("Error creating inventory item:", error);
    res.status(400).json({ error: "Error creating inventory item" });
  }
};

// Update an inventory item
exports.updateInventoryItem = async (req, res) => {
  try {
    console.log("Updating inventory item with id:", req.params.id);
    const [updated] = await Inventory.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedItem = await Inventory.findOne({
        where: { id: req.params.id },
      });
      console.log("Inventory item updated:", updatedItem);
      res.status(200).json(updatedItem);
    } else {
      throw new Error("Inventory item not found");
    }
  } catch (error) {
    console.error("Error updating inventory item:", error);
    res.status(400).json({ error: "Error updating inventory item" });
  }
};

// Delete an inventory item
exports.deleteInventoryItem = async (req, res) => {
  try {
    console.log("Deleting inventory item with id:", req.params.id);
    const deleted = await Inventory.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      console.log("Inventory item deleted");
      res.status(204).send();
    } else {
      throw new Error("Inventory item not found");
    }
  } catch (error) {
    console.error("Error deleting inventory item:", error);
    res.status(400).json({ error: "Error deleting inventory item" });
  }
};

// Get the last three test results for a specific asset
exports.getRecentTestHistory = async (req, res) => {
  try {
    const testHistory = await TestHistory.findAll({
      where: { assetId: req.params.id },
      order: [["date", "DESC"]],
      limit: 3,
    });
    console.log("Recent test history fetched:", testHistory);
    res.json(testHistory);
  } catch (error) {
    console.error("Error fetching recent test history:", error);
    res.status(500).json({ error: "Error fetching recent test history" });
  }
};

// Get all test results for a specific asset
exports.getAllTestHistory = async (req, res) => {
  try {
    const testHistory = await TestHistory.findAll({
      where: { assetId: req.params.id },
      order: [["date", "DESC"]],
    });
    console.log("All test history fetched:", testHistory);
    res.json(testHistory);
  } catch (error) {
    console.error("Error fetching all test history:", error);
    res.status(500).json({ error: "Error fetching all test history" });
  }
};

// Save test results for a specific asset
exports.saveTestResults = async (req, res) => {
  try {
    console.log("Request params:", req.params);
    console.log("Request body:", req.body);

    const {
      date,
      cordIntegrity,
      groundWireResistance,
      groundLeakageCurrent,
      chassisTouchCurrent,
      physicalIntegrity,
      polarity,
      continuityOfGroundTension, // New field
      ampacity,
    } = req.body.testResults; // Ensure we are accessing testResults

    // Check for required fields
    if (!date) {
      return res.status(400).json({ error: "Missing required field: date" });
    }

    // Save the test results to the database
    const testResult = await TestHistory.create({
      assetId: req.params.id,
      date,
      cordIntegrity: cordIntegrity || "N/A",
      groundWireResistance: groundWireResistance || "N/A",
      groundLeakageCurrent: groundLeakageCurrent || "N/A",
      chassisTouchCurrent: chassisTouchCurrent || "N/A",
      physicalIntegrity: physicalIntegrity || "N/A",
      polarity: polarity || "N/A",
      continuityOfGroundTension: continuityOfGroundTension || "N/A", // New field
      ampacity: ampacity || "N/A",
    });

    console.log("Test result saved:", testResult);
    res.status(201).json(testResult);
  } catch (error) {
    console.error("Error saving test results:", error);
    res.status(400).json({ error: "Error saving test results" });
  }
};
