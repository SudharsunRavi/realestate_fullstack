const router = require('express').Router();
const { updateUser, deleteUser } = require('../controllers/userController');
const { verifiedUser } = require('../middlewares/verifiedUser');

router.post('/update/:id', verifiedUser, updateUser)
router.delete('/delete/:id', verifiedUser, deleteUser)

module.exports = router;