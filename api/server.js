const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan"); // Import morgan
const inventoryRoutes = require("./routes/inventoryRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes"); // Import auth routes

dotenv.config(); // Load environment variables

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Use the CORS middleware
app.use(
  cors({
    origin: [
      "http://localhost:5174",
      "http://atrackerd.qli.local",
      "http://localhost:3002",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Use morgan for logging
app.use(morgan("combined"));

// To parse JSON bodies
app.use(express.json());

// Use the inventory routes
app.use("/api/inventory", inventoryRoutes);

// Use the dashboard routes
app.use("/api/dashboard", dashboardRoutes);

// Use the user routes
app.use("/api/users", userRoutes);

// Use the auth routes
app.use("/api/auth", authRoutes); // Add this line

// Define a route for the root URL
app.get("/", (req, res) => {
  res.send("Welcome to the Inventory API");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
