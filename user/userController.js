const UserService = require("./userService");
const userService = require("./userService");


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

