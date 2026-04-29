const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        buyer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        listing: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Listing",
            required: true
        },
        item: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        unit: {
            type: String,
            required: true
        },
        totalPrice: {
            type: Number,
            required: true
        },
        deliveryAddress: {
            name: String,
            type: String, // Home, Office, etc.
            fullAddress: String,
            phone: String
        },
        status: {
            type: String,
            enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
            default: "Pending"
        },
        paymentStatus: {
            type: String,
            enum: ["Pending", "Paid", "COD"],
            default: "Pending" // Paid via online, or COD
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
