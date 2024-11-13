const express = require("express");
const {
  register,
  getUsers,
  deleteUser,
} = require("../Controllers/userController");

const router = express.Router();

router.post("/register", register);
router.get("/", getUsers);
router.delete("/:id", deleteUser);

module.exports = router;
