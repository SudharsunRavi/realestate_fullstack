const router = require('express').Router();
const listingController = require('../controllers/listingController');
const { verifiedUser } = require('../middlewares/verifiedUser');
const {createListing, deleteListing, updateListing, getListings, getAllListings} = listingController;

router.post('/create', createListing);
router.delete('/delete/:id', verifiedUser, deleteListing);
router.put('/update/:id', verifiedUser, updateListing);
router.get('/getListing/:id', getListings);
router.get('/getListings', getAllListings);

module.exports = router;