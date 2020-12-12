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

    async getFriendsIds(userId){
        return await User.findById(userId, {_id:0, friends:1});
    }

    async isUserReputationValid(userid){
        return true;
    }

}


module.exports = UserService;