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

const getAllListings = async (req, res, next) => {
    try {
      const limit = parseInt(req.query.limit) || 9;
      const startIndex = parseInt(req.query.startIndex) || 0;

      let offer = req.query.offer;
      if (offer === undefined || offer === 'false') {
        offer = { $in: [false, true] };
      }
  
      let furnished = req.query.furnished;
      if (furnished === undefined || furnished === 'false') {
        furnished = { $in: [false, true] };
      }
  
      let parking = req.query.parking;
      if (parking === undefined || parking === 'false') {
        parking = { $in: [false, true] };
      }
  
      let type = req.query.type;
      if (type === undefined || type === 'all') {
        type = { $in: ['sale', 'rent'] };
      }
  
      const searchTerm = req.query.searchTerm || '';
      const sort = req.query.sort || 'createdAt';
      const order = req.query.order || 'desc';
  
      const listings = await Listing.find({
        name: { $regex: searchTerm, $options: 'i' },
        offer,
        furnished,
        parking,
        type,
      })
        .sort({ [sort]: order })
        .limit(limit)
        .skip(startIndex);
  
      return res.status(200).json(listings);
      
    } catch (error) {
      next(error);
    }
  };

module.exports = { createListing, deleteListing, updateListing, getListings, getAllListings };