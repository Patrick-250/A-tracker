const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const inventoryRoutes = require("./routes/inventoryRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes"); // Import the new routes

const app = express();

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/yourDatabaseName", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Use the CORS middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend's origin
  })
);

// To parse JSON bodies
app.use(express.json());

// Use the inventory routes
app.use("/api/inventory", inventoryRoutes);

// Use the dashboard routes
app.use("/api/dashboard", dashboardRoutes);

// Define a route for the root URL
app.get("/", (req, res) => {
  res.send("Welcome to the Inventory API");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
