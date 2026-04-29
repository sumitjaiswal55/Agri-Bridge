const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getProfile } = require("../controller/authController");
const fetchUser = require("../middleware/fetchUser.js");

// IMPORT USER MODEL (Ye missing tha)
const User = require("../models/User"); // Path check kar lena apne folder ke hisab se

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/profile", fetchUser, getProfile);

// TEST ROUTE - Optimized for Indexing Check
router.post("/test-index", async (req, res) => {
    try {
        // Ab hum Postman ki body se email le rahe hain
        const { email } = req.body; 

        if (!email) {
            return res.status(400).json({ error: "Please provide an email in the body" });
        }

        // Database logic with .explain()
        const stats = await User.find({ email: email }).explain("executionStats");

        // Response structure
        const report = {
            success: true,
            stage: stats.queryPlanner.winningPlan.stage, // IXSCAN = Good, COLLSCAN = Slow
            totalDocsExamined: stats.executionStats.totalDocsExamined,
            executionTimeMillis: stats.executionStats.executionTimeMillis,
            recommendation: stats.queryPlanner.winningPlan.stage === "IXSCAN" 
                ? "Perfect! Your index is working." 
                : "Warning: Full Table Scan detected. Add an index!"
        };

        res.json(report);
    } catch (error) {
        console.error("Indexing Test Error:", error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;