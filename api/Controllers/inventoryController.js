const Inventory = require("../models/inventoryModel");
const TestHistory = require("../models/testHistoryModel");
const { Op } = require("sequelize");

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
      continuityOfGroundTension,
      ampacity,
      nextTestDate, // Include nextTestDate in the request body
    } = req.body.testResults;

    // Check for required fields
    if (!date) {
      return res.status(400).json({ error: "Missing required field: date" });
    }

    console.log("Current test date:", date);
    console.log("Next test date:", nextTestDate);

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
      continuityOfGroundTension: continuityOfGroundTension || "N/A",
      ampacity: ampacity || "N/A",
      nextTestDate, // Save the next test date from the request body
    });

    console.log("Test result saved:", testResult);

    // Update the next test date for the asset in the Inventory table
    await Inventory.update({ nextTestDate }, { where: { id: req.params.id } });

    console.log("Next test date updated in Inventory table");

    res.status(201).json(testResult);
  } catch (error) {
    console.error("Error saving test results:", error);
    res.status(400).json({ error: "Error saving test results" });
  }
};

// Get assets with upcoming maintenance
exports.getUpcomingMaintenance = async (req, res) => {
  try {
    console.log("Fetching upcoming maintenance assets...");
    const currentDate = new Date();
    const fiveMonthsLater = new Date();
    fiveMonthsLater.setMonth(currentDate.getMonth() + 5);

    // Format dates as YYYY-MM-DD to exclude time component
    const currentDateString = currentDate.toISOString().split("T")[0];
    const fiveMonthsLaterString = fiveMonthsLater.toISOString().split("T")[0];

    console.log("Current date:", currentDateString);
    console.log("Five months later:", fiveMonthsLaterString);

    // Fetch all assets
    const assets = await Inventory.findAll();

    // Initialize an array to hold assets with upcoming maintenance
    const upcomingMaintenanceAssets = [];

    // Loop through each asset to check if maintenance is due
    for (const asset of assets) {
      // Fetch the most recent test for the asset
      const recentTest = await TestHistory.findOne({
        where: { assetId: asset.id },
        order: [["date", "DESC"]],
      });

      if (recentTest) {
        // Log the recent test details
        console.log(`Recent test for asset ID ${asset.id}:`, recentTest);

        // Use the next test date from the recent test
        const nextTestDate = new Date(recentTest.nextTestDate);

        console.log(
          `Asset ID: ${asset.id}, Next Test Date: ${
            nextTestDate.toISOString().split("T")[0]
          }`
        );

        // Check if the next test date is within the next 5 months
        if (nextTestDate >= currentDate && nextTestDate <= fiveMonthsLater) {
          // Add the asset to the list of assets with upcoming maintenance
          upcomingMaintenanceAssets.push({
            asset,
            recentTest,
            nextTestDate: nextTestDate.toISOString().split("T")[0],
          });
        }
      }
    }

    console.log(
      "Total assets with upcoming maintenance:",
      upcomingMaintenanceAssets.length
    );
    console.log(
      "Upcoming maintenance assets fetched:",
      upcomingMaintenanceAssets
    );
    res.json(upcomingMaintenanceAssets);
  } catch (error) {
    console.error("Error fetching upcoming maintenance assets:", error);
    res
      .status(500)
      .json({ error: "Error fetching upcoming maintenance assets" });
  }
};

// Get an asset by its assetNumber
exports.getAssetByNumber = async (req, res) => {
  const { assetNumber } = req.query;
  try {
    const asset = await Inventory.findOne({ where: { assetNumber } });
    if (asset) {
      res.json(asset);
    } else {
      res.status(404).json({ error: "Asset not found" });
    }
  } catch (error) {
    console.error("Error fetching asset:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
