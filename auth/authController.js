const { verify } = require('crypto');
const { request } = require('express');
const AuthService = require('./authService');
const EmailService = require('../shared/email').EmailService;
const NodeMailerSender = require('../shared/email').NodeMailerSender;
const path = require('path');

exports.register = async (req,res,next) => {

    try{
        let registerDetails = {
            
            phone: req.body.phone,
            password: req.body.password,
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            gender: req.body.gender,
            dob: req.body.dob
        }

        const auth = new AuthService();
    
        const result = await auth.signUp(registerDetails);

        res.status(200).json(result);

    }
    catch(e){
        next(e);
    }

}


exports.login = async (req,res,next) => {

    try{
        const loginData = {
            userIdentifier: req.body.phone,
            password: req.body.password
        }

        const auth = new AuthService();

        const result = await auth.signIn(loginData.userIdentifier,loginData.password);

        res.status(200).json(result);
    }
    catch(e){
        next(e);
    }

}


exports.forgetPassword = async (req,res,next) => {

    const data = {
        phone: req.body.phone,
        email: req.body.email
    }

    const auth = new AuthService();

    try{
        await auth.forgetPassword(data.phone,data.email);
        res.status(200).json({
            emailSent: true,
            message: "An email is sent."
        });
    }
    catch(e){
        next(e);
    }

}

exports.getResetPassword = async (req,res,next) => {

    try{

        const resetToken = req.params.token;

        const authService = new AuthService();

        let user = await authService.verifyResetToken(resetToken);

        const userData = {
            fullName: user.firstName + user.lastName,
            userId: user._id.toString(),
            password: user.password,
            confirmPassword: user.confirmPassword,
            resetToken: resetToken
        }
        
        res.render(path.join(__dirname,'..','views','auth','reset_password.ejs'),
                {title: "Reset Password",user: userData});
    }
    catch(e){
        next(e);
    }
    

}

exports.resetPassword = async (req,res,next) => {

    try{

        const resetToken = req.body.resetToken;
        const userId = req.body.userId;
        const password = req.body.password;
        const confirmPassword = req.body.confirmPassword; 

        const authService = new AuthService();

        await authService.changePassword(resetToken,userId,password);

        return res.send("Password Changed Successfully.");    
        
    }
    catch(e){
        next(e);
        //next(new Error("Cant reset your password. Try again. "));
    }
    

}


