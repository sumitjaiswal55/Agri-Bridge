const express = require("express");
const router = express.Router();
const {
    createOrder,
    getFarmerOrders,
    getBuyerOrders,
    updateOrderStatus
} = require("../controller/orderController");
const authMiddleware = require("../middleware/authMiddleware");

// Protected Routes (Require Login)
router.use(authMiddleware);

// Create new order
router.post("/create", createOrder);

// Get my orders as a farmer
router.get("/farmer", getFarmerOrders);

// Get my orders as a buyer
router.get("/buyer", getBuyerOrders);

// Map status update
router.put("/:id/status", updateOrderStatus);

module.exports = router;
