const express = require("express");
const router = express.Router();
const { 
    createListing, 
    updateListing, 
    deleteListing, 
    getAllListings, 
    getMyListings, 
    getListingById
} = require("../controller/listingController.js");
const protect = require("../middleware/authMiddleware.js");

// Image Upload Config
const multer = require("multer");
const { storage } = require("../config/cloudinary.js");
const upload = multer({ storage });

// --- Routes ---

// Public Route (Home Page)
router.get("/all", getAllListings);
router.get('/listings/:id', getListingById);

// Protected Routes
router.post("/create", protect, upload.array("images", 5), createListing);
router.get("/my-listings", protect, getMyListings); // Dashboard ke liye

router.route("/:id")
  .put(protect, updateListing)
  .delete(protect, deleteListing);

module.exports = router;