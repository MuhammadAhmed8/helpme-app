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
        let userId = req.user.id;
        let friendphone = req.body.phone;
        
        await userService.addFriend(userId,friendphone);
        res.status(200).json({
            success:true
        });
    }
    catch(e){
        next(e);
    }

}

exports.removeFriend = async (req,res,next) => {

    try{
        let userId = req.user.id;
        let friendphone = req.body.phone;
        if(userId === friendId){
            res.status(402).json({
                success: false,
                msg: "You cant befriend yourself"
            })
        }
        await userService.removeFriend(userId,friendphone);
        res.status(200).json({
            success: true
        });
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
        res.status(200).json({
            success: true
        })

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

        if(user1_id === user2_id){
            res.status(402).json({
                success: false,
                msg: 'You cant give review to yourself'
            })
        }

        const review = await userService.giveReview(content,user1_id,user2_id);

        res.status(200).json({
            success: true
        });

    }
    catch(e){
        next(e);
    }

}

exports.reportUser = async (req,res,next) => {

    try{
        let reportedBy = req.user.id;
        let {reportedTo,label} = req.body;
        
        const report = await userService.reportUser(reportedBy,reportedTo,label);

        res.status(200).json({
            success: true
        });

    }
    catch(e){
        next(e);
    }

}


exports.uploadImage = async (req, res, next) => {
    
    try{
        await userService.uploadProfilePhoto(req.user.id,req.file);
        res.json(req.file);
    }
    catch(e){
        next(e);
    }
}

exports.getAllFriends = async (req, res, next) => {
    
    try{
        const friends = await userService.getAllFriends(req.user.id);
        res.status(200).json(friends);
    }
    catch(e){
        next(e);
    }
}
