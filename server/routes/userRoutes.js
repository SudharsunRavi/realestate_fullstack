const router = require('express').Router();
const { user } = require('../controllers/userController');

router.get('/', user)

module.exports = router;