const Order = require("../models/Order");
const Listing = require("../models/Listing");

// Create a new order (Checkout from Cart)
exports.createOrder = async (req, res) => {
    try {
        const {
            sellerId,
            listingId,
            item,
            quantity,
            unit,
            totalPrice,
            deliveryAddress,
            paymentStatus
        } = req.body;

        // Optionally, check if quantity is available in stock
        const listing = await Listing.findById(listingId);
        if(!listing) {
             return res.status(404).json({ success: false, message: "Listing not found" });
        }
        if(listing.quantityAvailable < quantity) {
             return res.status(400).json({ success: false, message: "Not enough stock available" });
        }

        const newOrder = await Order.create({
            buyer: req.user._id,
            seller: sellerId,
            listing: listingId,
            item,
            quantity,
            unit,
            totalPrice,
            deliveryAddress,
            paymentStatus: paymentStatus || "COD"
        });

        // Deduct from total stock
        listing.quantityAvailable -= quantity;
        await listing.save();

        res.status(201).json({
            success: true,
            message: "Order placed successfully",
            data: newOrder
        });

    } catch (err) {
        console.error("Order Creation Error:", err);
        res.status(500).json({ success: false, message: err.message });
    }
};

// Get all orders for the logged-in Farmer
exports.getFarmerOrders = async (req, res) => {
    try {
        // Find orders where seller is current user
        const orders = await Order.find({ seller: req.user._id })
            .populate("buyer", "name phone location") // Get buyer details
            .sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            data: orders
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all orders for the logged-in Buyer
exports.getBuyerOrders = async (req, res) => {
    try {
        const orders = await Order.find({ buyer: req.user._id })
            .populate("seller", "name phone location")
            .sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            data: orders
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update order status (Farmer marks as shipped/delivered)
exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        
        let order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        // Verify that the person updating is the seller
        if (order.seller.toString() !== req.user._id.toString()) {
             return res.status(403).json({ success: false, message: "Not authorized to update this order" });
        }

        order.status = status;
        await order.save();

        res.status(200).json({
            success: true,
            message: "Order status updated",
            data: order
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
