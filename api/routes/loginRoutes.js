const express = require("express");
const router = express.Router();

// Dummy user for demonstration purposes
const users = [
  {
    username: "testuser",
    password: "password1234",
    name: "Test User",
  },
];

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    res.status(200).json({ message: "Login successful", user });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
});

module.exports = router;
