const { request } = require('express');
const AuthService = require('./authService');


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




