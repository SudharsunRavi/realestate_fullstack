const router = require('express').Router();
const { regsiter, login, googleLogin, logout } = require('../controllers/authController');

router.post('/register', regsiter);
router.post('/login', login);
router.post('/googleLogin', googleLogin)
router.get('/logout', logout)

module.exports = router;