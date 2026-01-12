const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        phone: {
            type: String, // Changed to String for correct length validation
            required: [true, "Phone number is required"],
            match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"]
        },
        role: {
            type: String,
            enum: ["farmer", "buyer", "seller"],
            default: "buyer",
            required: true
        },
        
        // --- Location Schema (GeoJSON) ---
        location: {
            type: {
                type: String,
                enum: ["Point"],
                default: "Point"
            },
            coordinates: {
                type: [Number], // Format: [Longitude, Latitude]
                index: "2dsphere", 
                default: [0, 0] // Default value if GPS fails
            },
            address: {
                type: String, // Ye form ke "Village/Area Name" se map hoga
                default: "" 
            }
        },

        // --- Role Based Fields ---
        
        // Only valid if role is "buyer"
        businessName: {
            type: String,
            required: function() { return this.role === "buyer"; }, // Only required for buyers
            trim: true
        },

        // Only valid if role is "farmer"
        farmDetails: {
            size: {
                type: Number,
                required: function() { return this.role === "farmer"; }
            },
            crops: {
                type: [String],
                default: []
            }
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", UserSchema);