const helpRequestSchema = require("./helpRequestSchema");
const HelpRequestService = require("./helpRequestService");
const UserService = require("../user/userService");

exports.createHelpRequest = async (req,res,next) => {

    try{

        const requestData = {
            creatorId : req.user.id,
            description : req.body.description.toLowerCase(),
            bloodGroup : req.body.bloodGroup,
        };

        const userLocation = {
            longitude : req.body.longitude,
            latitude: req.body.latitude
        };

        if(req.body.urgencyLevel !== undefined) 
            requestData['urgencyLevel'] = req.body.urgencyLevel;
        
        if(req.body.nearbyUsersAllowed !== undefined){
            requestData['nearbyUsersAllowed'] = req.body.nearbyUsersAllowed;
        }
        if(req.body.fnfAllowed !== undefined){
            requestData['fnf'] = req.body.fnf;
        }


        const helpRequestService = new HelpRequestService();
        const rec = await helpRequestService.createHelpRequest(userLocation,requestData);

        res.status(200).json(rec);

    }
    catch(e){
        next(e);
    }


}

exports.takeAction = async(req,res,next) => {

    try{

        let rid = req.body.requestId;
        let action = req.body.action;
        let uid = req.user.id;

        const helpRequestService = new HelpRequestService();
        await helpRequestService.takeAction(rid,action,uid);

        res.status(200).json({acknowledged: true});

    }
    catch(e){
        next(e);
    }

}


exports.getHelpRequestsSent = async(req,res,next) => {

    try{
        const userId = req.user.id;
        const helpRequestService = new HelpRequestService();
        const rec = await helpRequestService.getHelpRequestsSent(userId);

        res.status(200).json(rec);
    }
    catch(e){
        next(e);
    }

}