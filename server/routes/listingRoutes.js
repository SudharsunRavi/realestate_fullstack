const router = require('express').Router();
const listingController = require('../controllers/listingController');
const { verifiedUser } = require('../middlewares/verifiedUser');
const {createListing, deleteListing} = listingController;

router.post('/create', createListing);
router.delete('/delete/:id', verifiedUser, deleteListing);

module.exports = router;