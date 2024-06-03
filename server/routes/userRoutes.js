const router = require('express').Router();
const { updateUser, deleteUser, userListing } = require('../controllers/userController');
const { verifiedUser } = require('../middlewares/verifiedUser');

router.post('/update/:id', verifiedUser, updateUser)
router.delete('/delete/:id', verifiedUser, deleteUser)
router.get('/listing/:id', verifiedUser, userListing)

module.exports = router;