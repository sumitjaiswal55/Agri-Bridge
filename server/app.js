// Dotenv ko sirf development mein chalaiye
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require("express");
const cors = require("cors");
const mongoDB = require("./config/db.js");

const app = express();

// Database Connection function with async/await
const connectDB = async () => {
  try {
    await mongoDB();
    console.log("MongoDB Connected Successfully");
  } catch (err) {
    console.error("MongoDB Connection Failed:", err.message);
    // Serverless environment mein crash na ho isliye exit nahi karenge
  }
};

// CORS configuration (Simple for debugging)
app.use(cors({
  origin: "*",
  credentials: true
}));

app.use(express.json());

// Routes
app.use("/auth", require("./routes/userRoutes.js"));
app.use("/api", require("./routes/productRoutes.js"));

app.get("/", (req, res) => res.send("AgriBridge API is Live!"));

// Database connect karke app export kijiye
connectDB();

module.exports = app;