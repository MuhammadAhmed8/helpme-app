const crypto = require('crypto');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const User = require('../user/userSchema');


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
                            
        const token = this.generateToken(userRecord);
        
        const user = userRecord.toObject();
        Reflect.deleteProperty(user,"password");
        Reflect.deleteProperty(user,"salt");

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

        const token = this.generateToken(userRecord);

        const user = this.MapToTokenUser(userRecord);

        return {
            token: token,
            user: user
        }
    }

    generateToken(user){
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


    MapToTokenUser(userRecord){
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