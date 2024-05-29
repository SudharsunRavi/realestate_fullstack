const router = require('express').Router();
const { regsiter, login, googleLogin } = require('../controllers/authController');

router.post('/register', regsiter);
router.post('/login', login);
router.post('/googleLogin', googleLogin)

module.exports = router;