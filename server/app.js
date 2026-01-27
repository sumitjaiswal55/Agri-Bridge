require('dotenv').config();
const express = require("express");
const app = express();
const mongoDB = require("./config/db.js");

const userRoute = require("./routes/userRoutes.js");
const productRoute = require("./routes/productRoutes.js");
const cors = require("cors");


// CORS Configuration
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      "http://localhost:5173",
      "http://localhost:3000",
      "https://agribridge.sumitjaiswal.in",
      "https://agribridge-brown.vercel.app",
      "https://agri-bridge-hih9xy86b-sumitjaiswal55s-projects.vercel.app"
    ];
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  preflightContinue: false,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Preflight handling
app.options("*", cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}


app.get("/", (req, res)=>{
    res.send(`Server is running on port ${PORT}`);
});

app.use("/auth", userRoute);
app.use("/api", productRoute);
mongoDB();

module.exports = app;
