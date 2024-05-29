const router = require('express').Router();
const { regsiter, login } = require('../controllers/authController');

router.post('/register', regsiter);
router.post('/login', login);

module.exports = router;