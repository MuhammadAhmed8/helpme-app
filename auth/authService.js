const crypto = require('crypto');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const EmailService = require('../shared/email').EmailService;
const NodeMailerSender = require('../shared/email').NodeMailerSender;
const User = require('../user/userSchema');
const { ObjectID, ObjectId } = require('mongodb');
const { Mongoose } = require('mongoose');

const BaseUrl = "https://helpme-restapi.herokuapp.com/";

class AuthService{

    constructor(){}


    /*
     *  @input {user} accepts an object with 
     *         username,password,phone,firstname,lastname
     *  @returns {Promise<Object> where Object contains token and user}
    */
    async signUp(userDTO){
     
        if (await User.findOne({phone: userDTO.phone}) ){
            throw new Error("User already exists");
        }

        let salt = crypto.randomBytes(32);
        const hashedPassword =  await argon2.hash(userDTO.password,{salt});

        
        const userRecord = await User.create({
                            ...userDTO,
                            password: hashedPassword,
                            salt: salt.toString('hex')
                        });
                            
        const token = this._generateToken(userRecord);
        
        const user = this._mapToTokenUser(userRecord);


        return {
            token: token,
            user: user
        }    
        

    }

    async signIn(userIdentifier, password){

        // userIdentifier is phone number

        const userRecord = await User.findOne({'phone': userIdentifier});

        if(!userRecord){
            throw new Error("User not found");
        }

        const isValidPassword = await argon2.verify(userRecord.password,password);

        if(!isValidPassword){
            throw new Error('Invalid Password');
        }

        const token = this._generateToken(userRecord);

        const user = this._mapToTokenUser(userRecord);

        return {
            token: token,
            user: user
        }
    }


    async forgetPassword(phone,email){
        
        const userRecord = await this._verifyEmailExists(phone,email);

        if(!userRecord){
            throw new Error("This email is not linked with this account");
        }

        const buffer = crypto.randomBytes(64);

        const resetToken = buffer.toString("hex");

        const resetTokenExpiry = Date.now() + 3600000;

        const resetUrl = `${BaseUrl}auth/reset_password/${resetToken}`;


        userRecord.resetToken = resetToken;
        userRecord.resetTokenExpiry = resetTokenExpiry;

        await userRecord.save();

        const mailService = new EmailService(new NodeMailerSender());

        const html =  `<p>Somebody requested a password reset on your account. If you requested it, click the
                       provided link to reset your password. If you didn't, change your password immediately. </p>
                       <br><br>
                       <a href="${resetUrl}">${resetUrl}</a>
                       <br><br>If you don’t use this link within 1 hour, 
                       it will expire.`;
        
        mailService.send(userRecord.email,'muhammad1999ma@gmail.com','Reset Your Password',html);

    }

    async verifyResetToken(resetToken){
        const userRecord = await User.findOne({
            resetToken: resetToken
        })

        if(!userRecord){
            throw new Error('Invalid Token'); 
        }

        const isTokenExpired = userRecord.resetTokenExpiry <= Date.now();

        if(isTokenExpired){
            throw new Error('Token Expired'); 
        }

        return this._mapToTokenUser(userRecord);

    }

    async changePassword(token,userId,password){
        console.log("t: " + token)
        const userRecord = await User.findOne({
            resetToken: token,
            resetTokenExpiry: {$gt: Date.now()}
        });

        if(!userRecord)
            throw new Error('user doesnt exists');

        const salt = crypto.randomBytes(32);
        const hashedpassword = await argon2.hash(password,salt);

        userRecord.password = hashedpassword;
        userRecord.resetToken = undefined;
        userRecord.resetTokenExpiry = undefined;

        await userRecord.save();


        
    }

    // ------ private --------


    async _verifyEmailExists(phone,email){

        const userRecord = await User.findOne({
                                    phone: phone,
                                    email: email
                                });
        
        return userRecord;

    }




    _generateToken(user){
        const secret = "someSuperSecretKey";
        return jwt.sign(
                {
                    id : user._id.toString(),
                    phone: user.phone,
                },
                secret,
                {expiresIn: '2 days'}
            );

    }


    _mapToTokenUser(userRecord){
        const user = userRecord.toObject();
        Reflect.deleteProperty(user,"password");
        Reflect.deleteProperty(user,"salt");
        return user;
    }



}



/*
    Testing manually !
*/
function test(){
    let a = new AuthService();
    let user = {
        username: "haris",
        password: "haris",
        firstName: "Haris",
        lastName: "Khan",
        phone: "03332245120"
    }
    a.signUp(user)
    .then(result => {
        console.log(result);
    })
    .catch(err => {
        console.log(err);
    })
}

module.exports = AuthService;