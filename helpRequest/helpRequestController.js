const helpRequestSchema = require("./helpRequestSchema");
const HelpRequestService = require("./helpRequestService");

exports.createHelpRequest = async (req,res,next) => {

    try{

        const requestData = {
            creatorId : req.user.id,
            description : req.body.description,
        };

        const userLocation = {
            longitude : req.body.longitude,
            latitude: req.body.latitude
        };

        if(req.body.urgencyLevel !== undefined) 
            requestData['urgencyLevel'] = req.body.urgencyLevel;
        
        if(req.body.nearybyUsersAllowed !== undefined){
            requestData['nearybyUsersAllowed'] = req.body.nearybyUsersAllowed;
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