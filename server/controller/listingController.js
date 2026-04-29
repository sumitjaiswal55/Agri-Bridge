const Listing = require("../models/Listing.js");
const User = require("../models/User.js");

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

        if (listing.seller.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: "Not authorized to update this listing" });
        }

        // Update logic
        let updateData = { ...req.body };


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
        const { lat, lng, distance } = req.query;
        let query = { isActive: true };

        if (lat && lng && distance) {
            // Find farmers within maxDistance (in meters)
            const usersNear = await User.find({
                location: {
                    $near: {
                        $geometry: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
                        $maxDistance: parseInt(distance) * 1000 // Convert km to meters
                    }
                },
                role: "farmer"
            }).select('_id');
            
            const sellerIds = usersNear.map(u => u._id);
            query.seller = { $in: sellerIds };
        }

        const listings = await Listing.find(query)
            .sort({ createdAt: -1 })
            .populate('seller', 'name location'); 
        
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


// Get Single Listing by ID
exports.getListingById = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id).populate('seller', 'name');

        if (!listing) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.status(200).json(listing);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};