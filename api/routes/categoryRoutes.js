// routes/categoryRoutes.js
const express = require("express");
const {
  getCategories,
  createCategory,
} = require("../Controllers/categoryController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", protect, getCategories);
router.post("/", protect, createCategory);

module.exports = router;
