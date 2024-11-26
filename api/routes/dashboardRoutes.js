const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const Asset = require("../models/inventoryModel");
const TestHistory = require("../models/testHistoryModel");
const {
  getUpcomingMaintenance,
} = require("../controllers/inventoryController");

// Endpoint to get total assets
router.get("/total-assets", async (req, res) => {
  try {
    const totalAssets = await Asset.count();
    res.json({ totalAssets });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch total assets" });
  }
});

// Endpoint to get total beds
router.get("/total-beds", async (req, res) => {
  try {
    const totalBeds = await Asset.count({ where: { type: "Bed" } });
    res.json({ totalBeds });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch total beds" });
  }
});

// Endpoint to get total power strips
router.get("/total-power-strips", async (req, res) => {
  try {
    const totalPowerStrips = await Asset.count({
      where: { type: "Power Strip" },
    });
    res.json({ totalPowerStrips });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch total power strips" });
  }
});

// Endpoint to get total medical equipment
router.get("/total-medical-equipment", async (req, res) => {
  try {
    const totalMedicalEquipment = await Asset.count({
      where: { type: "Medical Equipment" },
    });
    res.json({ totalMedicalEquipment });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch total medical equipment" });
  }
});

// Endpoint to get total electronic appliances
router.get("/total-electronic-appliances", async (req, res) => {
  try {
    const totalElectronicAppliances = await Asset.count({
      where: { type: "Electronic Appliances" },
    });
    res.json({ totalElectronicAppliances });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch total electronic appliances" });
  }
});

// Endpoint to get total upcoming maintenance
router.get("/total-upcoming-maintenance", async (req, res) => {
  try {
    const currentDate = new Date();
    const fiveMonthsLater = new Date();
    fiveMonthsLater.setMonth(currentDate.getMonth() + 5);

    const totalUpcomingMaintenance = await TestHistory.count({
      where: {
        nextTestDate: {
          [Op.between]: [currentDate, fiveMonthsLater],
        },
      },
    });
    res.json({ totalUpcomingMaintenance });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch total upcoming maintenance" });
  }
});

// Endpoint to get assets with upcoming maintenance
router.get("/upcoming-maintenance", getUpcomingMaintenance);

module.exports = router;
