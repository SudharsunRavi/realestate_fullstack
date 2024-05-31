const router = require('express').Router();
const listingController = require('../controllers/listingController');
const { verifiedUser } = require('../middlewares/verifiedUser');
const {createListing} = listingController;

router.post('/create', verifiedUser, createListing);

module.exports = router;