// routes/itemRoutes.js
const express = require("express");
const { getItems, createItem } = require("../Controllers/itemController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", protect, getItems);
router.post("/", protect, createItem);

module.exports = router;
