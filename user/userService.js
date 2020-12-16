const appointmentsSchema = require("../helpServices/appointmentsSchema");
const User = require("./userSchema");


class UserService{
    
    constructor(){}

    async updateUserLocation(userId,newCoordinates){
        
        await User.updateOne({_id: userId}, { $set: {
            location:{
                type:"Point",
                coordinates: newCoordinates
            }
          }
        })

    }

    async findNearByUsers(long,lat,radius){

        return await User.find({location:
                    {
                        $near:
                        {
                            $geometry:
                            {
                                type:"Point",
                                coordinates:[long,lat]
                            },
                                
                            $maxDistance:radius,
                            $minDistance:0
                        }
                    }
                }).select("_id");

    }


    async addFriend(user1_id,user2_id){
        await User.updateOne({_id: user1_id}, {$push: {
            friends : user2_id
        }});

    }

    async isFriend(user1_id, user2_id){
        const rec = await User.find({_id: user1_id, friends: user2_id}).select("_id");
        if(!rec)
            return false;
        return true;
    }

    async getFriendsIds(userId){
        return await User.findById(userId, {_id:0, friends:1});
    }

    async isUserReputationValid(userid){
        return true;
    }

    async addDeviceRegistrationToken(userId,devToken){
        const exists =  await User.findOne({_id: userId, deviceRegistrationTokens: devToken}).select("_id");

        if(exists) return;

        await User.updateOne({_id: userId}, {$push:{
            deviceRegistrationTokens : devToken
        }});

    }




    async giveReview(content,user1_id,user2_id){
        
        let interactions = 0;
        interactions = await appointmentsSchema.findOne({finderId: user1_id, serviceProviderId: user2_id})
                                               .count();
                                                        

        if(interactions === 0){
            throw new Error("You are not allowed to give any review");
        }
        
        await User.updateOne({_id: user2_id}, {$push: {
                        reviews: {
                            content: content,
                            authorId: user1_id,
                        }
                    }});
        }

}


module.exports = UserService;
