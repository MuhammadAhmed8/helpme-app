const User = require("./userSchema");
const UserService = require("./userService");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

class UserProfileService{

    constructor(){}

    async getUserProfile(userId){

        return await User.findOne({_id: userId})
                         .select("_id firstName lastName image phone dob gender")
                         .populate('friends', "_id firstName lastName image");

      
    }

    async updateName(userId, name, index){

        let newName = index == 0 ? { firstName : name } : { lastName : name }
        
        await User.updateOne({_id : userId}, {$set: {newName}});

    }

    async updateAbout(userId, content){

        await User.updateOne({_id : userId}, {$set: {
            about: content
        }});

    }

    
}

module.exports = UserProfileService;