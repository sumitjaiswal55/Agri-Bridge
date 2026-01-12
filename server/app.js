require('dotenv').config();
const express = require("express");
const app = express();
const mongoDB = require("./config/db.js");

const userRoute = require("./routes/userRoutes.js");
const productRoute = require("./routes/productRoutes.js");
const cors = require("cors");


app.use(cors({
  origin: "http://localhost:5173", // Tumhare Frontend ka URL (Vite default)
  credentials: true // Cookies/Session allow karne ke liye
}));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}


app.get("/", (req, res)=>{
    res.send(`Server is running on port ${port}`);
});

app.use("/auth", userRoute);
app.use("/api", productRoute);
mongoDB();

module.exports = app;
