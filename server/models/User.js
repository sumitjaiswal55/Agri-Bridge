const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true,

        },
        phone: {
            type: Number,
            required: true,
            maxLength: 10,
            minLength: 10
        },
        role: {
            type: String,
            enum: ["farmer", "buyer", "seller"],
            default: "buyer"
        },
        location: {
            type: {
                type: String,
                enum: ["Point"],
                default: "Point",
            },
            coordinates: {
                type: [Number], 
                required: true,
            },
            address: {
                type: String, 
            },
        },
        farmDetails: {
            size: Number, 
            crops: [String],
        },
        // Buyer specific details
        businessName: {
            type: String, // e.g., "Taj Hotel"
        },
    },
    {
        timestamps: true
    }
);

UserSchema.index({location: "2dsphere"});

module.exports = mongoose.model("User" , UserSchema);