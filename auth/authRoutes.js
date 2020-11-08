const express = require('express');

const router = express.Router();

const AuthService = require('./authService');

const AuthController = require('./authController');

const v = require('../shared/validators'); 


router.post('/login',AuthController.login);

router.post('/register', v.validate('createUser'), v.resolveValidation, AuthController.register);


module.exports = router;

