const router = require('express').Router();
const listingController = require('../controllers/listingController');
const {createListing} = listingController;

router.post('/create', createListing);

module.exports = router;