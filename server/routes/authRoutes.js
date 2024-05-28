const router = require('express').Router();
const { regsiter } = require('../controllers/authController');

router.post('/register', regsiter);

module.exports = router;