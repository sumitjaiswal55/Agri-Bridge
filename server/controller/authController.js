const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role, phone, location, farmDetails, businessName } = req.body;

    if (!name || !email || !password || !phone) {
      return res.status(400).json({ success: false, message: "Please provide all required fields" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    let userData = {
        name,
        email,
        password: hashPassword,
        role: role || "buyer",
        phone,
        location: location // Frontend ab direct sahi format bhej raha hai { type, coordinates, address }
    };

    // --- Role Based Cleaning ---
    // Agar Buyer hai, to Farm Details hata do
    if (role === "buyer") {
        if (!businessName) {
             return res.status(400).json({ success: false, message: "Business Name is required for Buyers" });
        }
        userData.businessName = businessName;
        // Farm details add hi mat kro
    } 
    // Agar Farmer hai, to Business Name hata do
    else if (role === "farmer") {
        userData.farmDetails = farmDetails; // Frontend se aayi hui farm details
        // Business name add hi mat kro
    }

    // 6. Create User in Database
    const user = await User.create(userData);

    if (user) {
      res.status(201).json({
        success: true,
        message: "User Registered Successfully",
        data: {
          _id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
          location: user.location,
          // Token bhi yahi de sakte ho agar auto-login karana hai
          token: generateToken(user.id) 
        },
      });
    } else {
      res.status(400).json({ success: false, message: "Invalid user data" });
    }

  } catch (err) {
    console.error("Register Error:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please provide email and password" });
    }

    // 1. Find User
    const user = await User.findOne({ email });

    // 2. Safety Check: Agar user nahi mila, to yahi rok do (warn: crash se bachega)
    if (!user) {
        return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // 3. Check Password
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      res.json({
        success: true,
        message: "Login Successful",
        data: {
          _id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
          businessName: user.businessName, // Optional: Frontend ko display ke liye chahiye ho to
          token: generateToken(user.id),
        },
      });
    } else {
      res.status(401).json({ success: false, message: "Invalid email or password" });
    }
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.getProfile = async (req, res) => {
  try {
    console.log("User from Request:", req.user); 

    if (!req.user) {
        return res.status(401).json({ success: false, message: "User not authenticated inside controller" });
    }

    // 2. ID Nikalo (Safe Tarike se)
    // Ye line wahi hai jahan error aa raha tha (reading 'id')
    const userId = req.user.id || req.user._id; 

    // 3. Database se user dhundo
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found in DB" });
    }

    res.json({ success: true, data: user });
  } catch (error) {
    console.error("Get Profile Error:", error); // Pura error print karo
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

