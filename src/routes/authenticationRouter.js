const authenticationController = require('../controllers/authenticationController');

const router = require('express').Router();

router.post('/signup', authenticationController.signup);

router.post('/login', authenticationController.login);

router.post('/refreshToken', authenticationController.refreshToken);

module.exports = router;
