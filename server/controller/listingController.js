const Listing = require("../models/Listing.js"); // File path check karlena

// 1. Create Listing (With Image Upload)
exports.createListing = async (req, res) => {
    try {
        // Validation: Check if files exist
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ 
                success: false, 
                message: "Please upload at least one image" 
            });
        }

        // Map uploaded files to Schema format
        const imageFiles = req.files.map((file) => ({
            url: file.path,       // Cloudinary URL
            public_id: file.filename // Cloudinary ID (deletion ke liye kaam aata hai)
        }));

        const {
            name,
            description,
            quantity,        // Unit type (e.g., Kg)
            category,
            pricePerUnit,
            quantityAvailable, // Stock
            grade,
            harvestDate,
            minOrderQuantity
        } = req.body;

        const listing = await Listing.create({
            seller: req.user._id, // 🔥 Auth middleware se user ID lo (Secure)
            name,
            description,
            quantity,
            category,
            pricePerUnit,
            quantityAvailable,
            grade,
            harvestDate,
            minOrderQuantity,
            images: imageFiles, // Uploaded images yahan save hongi
        });

        res.status(201).json({
            success: true,
            message: "Listing Created Successfully",
            data: listing
        });

    } catch (err) {
        console.error("Listing Error:", err);
        res.status(500).json({ success: false, message: err.message });
    }
};

// 2. Update Listing
exports.updateListing = async (req, res) => {
    try {
        let listing = await Listing.findById(req.params.id);

        if (!listing) {
            return res.status(404).json({ success: false, message: "Listing not found" });
        }

        // Check Ownership (Sirf wahi update kare jisne banaya hai)
        if (listing.seller.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: "Not authorized to update this listing" });
        }

        // Update logic
        let updateData = { ...req.body };

        // Agar nayi images upload hui hain, toh unhe add karo (Optional logic)
        // Filhal hum text update pe focus kar rahe hain.
        // Agar images replace karni hain toh alag logic lagega.

        listing = await Listing.findByIdAndUpdate(req.params.id, updateData, {
            new: true, // Return updated object
            runValidators: true,
        });

        res.status(200).json({ 
            success: true, 
            message: "Listing updated successfully", 
            data: listing 
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 3. Delete Listing
exports.deleteListing = async (req, res) => {
    try {
        let listing = await Listing.findById(req.params.id);

        if (!listing) {
            return res.status(404).json({ success: false, message: "Listing not found" });
        }

        // Check Ownership
        if (listing.seller.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: "Not authorized to delete this listing" });
        }

        // TODO: Future enhancement - Cloudinary se bhi images delete karni chahiye yahan

        await listing.deleteOne();
        
        res.status(200).json({ 
            success: true, 
            message: "Listing deleted successfully" 
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 4. Get All Listings (Home Page ke liye)
exports.getAllListings = async (req, res) => {
    try {
        // Filters (Future me yahan category/search logic aayega)
        const listings = await Listing.find({ isActive: true }).sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            count: listings.length,
            data: listings
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// 5. Get My Listings (Farmer Dashboard ke liye)
exports.getMyListings = async (req, res) => {
    try {
        const listings = await Listing.find({ seller: req.user._id }).sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            data: listings
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};