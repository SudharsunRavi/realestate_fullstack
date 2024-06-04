const { errorHandler } = require("../middlewares/error");
const Listing  = require("../models/listingModel");

const createListing = async (req, res, next) => {
    try {
        const listing=await Listing.create(req.body);
        return res.status(201).json({
            success: true,
            listing
        });
    } catch (error) {
        next(error);
    }
};

const deleteListing = async (req, res, next) => {
    try {
        const listing = await Listing.findById(req.params.id);

        if (!listing) return next(errorHandler(404, "Listing not found"));
        if(req.user.id !== listing.userRef) return next(errorHandler(403, "You are not authorized to delete this listing"));

        await Listing.findByIdAndDelete(req.params.id);
        return res.status(200).json({message: "Listing deleted successfully"});
    } catch (error) {
        next(error);
    }
};

const updateListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);
    try {
        if (!listing) return next(errorHandler(404, "Listing not found"));
        if(req.user.id !== listing.userRef) return next(errorHandler(403, "You are not authorized to update this listing"));

        const updatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body, {new: true});

        return res.status(200).json({
            success: true,
            updatedListing
        });
    } catch (error) {
        next(error);
    }
}

const getListings = async (req, res, next) => {
    try {
        const listingID=req.params.id;
        const listing = await Listing.findById(listingID);
        if(!listing) return next(errorHandler(404, "Listing not found"));
        return res.status(200).json(listing);
    } catch (error) {
        next(error);
    }
}

module.exports = { createListing, deleteListing, updateListing, getListings };