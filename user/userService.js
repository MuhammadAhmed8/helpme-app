const { model } = require("./userSchema");
const User = require("./userSchema");


class UserService{
    
    constructor(){}

    async updateUserLocation(userId,newCoordinates){
        
        await User.updateOne({phone: userId}, { $set: {
            location:{
                type:"Point",
                coordinates: newCoordinates
            }
          }
        })



    }

    async findNearByUsers(long,lat,radius){

        await User.find({location:
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
                });

    }

}


module.exports = UserService;