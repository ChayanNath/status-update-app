const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

// Load environment variables from .env file
dotenv.config();

// Import routes
const authRoutes = require("./routes/authRoutes");
const teamRoutes = require("./routes/teamRoutes");
const statusRoutes = require("./routes/statusRoutes");
const userRoutes = require("./routes/userRoutes");

// Import database configuration
const connectDB = require("./config/db");

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser()); // Add cookie-parser middleware
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173", // Adjust to your frontend URL
    credentials: true, // Allow cookies to be sent
  })
);

// Passport middleware
app.use(passport.initialize());
require("./config/passport")(passport); // Pass passport for configuration

// Routes
app.use("/api/auth", authRoutes);
app.use(
  "/api/team",
  passport.authenticate("jwt", { session: false }),
  teamRoutes
);
app.use(
  "/api/status",
  passport.authenticate("jwt", { session: false }),
  statusRoutes
);
app.use(
  "/api/users",
  passport.authenticate("jwt", { session: false }),
  userRoutes
);

// Handle production
if (process.env.NODE_ENV === "production") {
  // Static folder
  app.use(express.static(__dirname + "/public/"));

  // Handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
}

// Error handling middleware
const errorHandler = require("./middleware/errorMiddleware");
app.use(errorHandler);

// Define PORT
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
