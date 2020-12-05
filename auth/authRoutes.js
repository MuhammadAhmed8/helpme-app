const express = require('express');

const router = express.Router();

const AuthController = require('./authController');

const v = require('../shared/validators'); 


router.post('/login',AuthController.login);

router.post('/register', v.validate('createUser'), v.resolveValidation, AuthController.register);

router.post('/forget_password',AuthController.forgetPassword);

router.get('/reset_password/:token',AuthController.getResetPassword);

router.post('/reset_password',v.validate('resetPassword'),v.resolveValidation,AuthController.resetPassword);




module.exports = router;

