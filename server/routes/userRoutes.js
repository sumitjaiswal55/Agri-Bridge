const express = require("express");
const router = express.Router();
const {registerUser, loginUser, getProfile} =  require("../controller/authController")
const fetchUser  = require("../middleware/fetchUser.js")


router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/profile", fetchUser, getProfile);

module.exports = router;