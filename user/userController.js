const UserService = require("./userService");
const UserProfileService = require("./userProfileService");

const userService = new UserService();
const userProfileService = new UserProfileService();


exports.updateLocation = async (req,res,next) => {


    const userId = req.body.userId;
    const newCoordinates = [req.body.longitude,req.body.latitude];
    
    try{
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

        const profile = await userService.addFriend(userId,friendId);
        res.status(200).json(profile);
    }
    catch(e){
        next(e);
    }


}

exports.getProfile = async (req,res,next) => {

    try{
        let userId = req.user.id;
        let personId = req.params.personId;

        const profile = await userProfileService.getUserProfile(personId.toString(),userId.toString());
        res.status(200).json(profile);
    }
    catch(e){
        next(e);
    }


}

exports.addDeviceRegistrationToken = async (req,res,next)=>{

    try{

        await userService.addDeviceRegistrationToken(req.user.id,req.body.devToken);


    }
    catch(e){
        next(new Error("Device Registration token failed to register"));
    }

}

exports.giveReview = async (req,res,next) => {

    try{

        let user1_id = req.user.id;
        let user2_id = req.body.userId;
        let content = req.body.content;

        const review = await userService.giveReview(content,user1_id,user2_id);

        res.status(200).json(review);

    }
    catch(e){
        next(e);
    }

}