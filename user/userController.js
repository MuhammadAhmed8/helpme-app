const UserService = require("./userService");
const UserProfileService = require("./userProfileService");


exports.updateLocation = async (req,res,next) => {


    const userId = req.body.userId;
    const newCoordinates = [req.body.longitude,req.body.latitude];
    
    try{
        const userService = new UserService();
        await userService.updateUserLocation(userId,newCoordinates);
        res.status(200).json({});
    }
    catch(e){
        next(e);
    }


}


exports.addFriend = async (req,res,next) => {

    try{
        let userId = req.body.userId;
        let friendId = req.body.friendId;

        const userService = new UserService();
        const profile = await userService.addFriend(userId,friendId);
        res.status(200).json(profile);
    }
    catch(e){
        next(e);
    }


}

exports.getProfile = async (req,res,next) => {

    try{
        let userId = req.params.userId;
        console.log(userId);
        const userProfileService = new UserProfileService();
        const profile = await userProfileService.getUserProfile(userId.toString());
        res.status(200).json(profile);
    }
    catch(e){
        next(e);
    }


}
