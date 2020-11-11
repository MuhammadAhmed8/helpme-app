const {body,validationResult} = require('express-validator');
const MyError = require('./errorHandler').MyError;

exports.validate = (method) => {
    switch(method) {

        case 'createUser': {
            
            return [
                body('phone').exists('Account already exists')
                    .matches(/^(03(?:[0-46]\d|55)\d{7})$/)
                    .withMessage('Mobile Number is not valid'),

                body('password').exists().isLength({min:8}).withMessage('Password should contain atleast 8 characters')
                    .custom( (value,{req}) => {
                        if(req.body.confirmPassword === value){
                            return value;
                        }

                        throw new Error("Passwords dont match");
                    }),

                body('email','Invalid email').exists().isEmail(),

                body(['firstName','lastname'], 'Name must contain only alphabets').trim().escape().exists(),

                body('dob',"Date of birthday should be given").isString().exists().custom((value) => {
                    const dob = new Date(value); 
                    const curr = new Date(Date.now());
                    if(dob.getFullYear() < curr.getFullYear())
                        return dob;
                    throw new Error("Incorrect date of birth");    
                }),

                body('gender').exists().custom( value => {
                    if(value === 'male' || value === 'female'){
                        return value;
                    }
                    throw new Error('Gender can be male or female');
                })
                

            ]


        }
        break;

        case 'resetPassword':{
            return [

                body('password').exists().isLength({min:8}).withMessage('Password should contain atleast 8 characters')
                    .custom( (value,{req}) => {
                        if(req.body.confirmPassword === value){
                            return value;
                        }

                        throw new Error("Passwords dont match");
                    }),
            ]
        }
        
        break;


    }
}


exports.resolveValidation = (req,res,next) => {

    let errors = validationResult(req);

    if(errors.isEmpty()){
        return next();
    }

    return res.status(422).json({
        'errors': errors.array()
    })    

} 