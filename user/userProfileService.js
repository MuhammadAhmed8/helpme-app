const User = require("./userSchema");
const UserService = require("./userService");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

class UserProfileService{

    constructor(){}

    async getUserProfile(personId,userId){

        let profile = User.findOne({_id: personId})
                          .populate("reviews")
                          .populate("services","_id name")
                          .select("_id firstName lastName image dob gender reviews email")
        
        const userService = new UserService();

        if(userId === personId){
            profile.populate('friends', "_id firstName lastName image phone");
        }

        if(userId === personId || userService.isFriend(userId,personId) ){
            profile.select('phone');   
        }

        return await profile;

        
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