const User = require("../user/userSchema");
const UserService = require("../user/userService");
const HelpRequest = require("./helpRequestSchema");
const notificationService = require("../shared/notification");
const { request } = require("express");


class HelpRequestService{

    constructor(){}

    async createHelpRequest(userLocation, requestData){

        const userService = new UserService();

        if( (await userService.isUserReputationValid(requestData.creatorId)) === false ){
            return -1;
        }

        let rad = 49;
        

        let nearbyUsers = await userService.findNearByUsers(userLocation.longitude, userLocation.latitude, rad );
        let friends = await userService.getFriendsIds(requestData.creatorId);
        let usersWithSameBloodGroup = [];

        if(requestData['description'] === "blood"){
            if(requestData.bloodGroup === undefined){
                requestData.bloodGroup = (await User.findOne({_id: requestData.creatorId}).select("bloodGroup")).bloodGroup;
            }
            console.log(requestData.bloodGroup);
            usersWithSameBloodGroup = await User.find({bloodGroup: requestData.bloodGroup}).select("_id");

        }

        nearbyUsers = nearbyUsers.map(u=>{
            return {uid : u._id}
        })

        friends = friends.friends.map(fid => {
            return {uid : fid}
        })


        usersWithSameBloodGroup = usersWithSameBloodGroup.map(u => {
            return {uid:u._id}
        })

        console.log("b", usersWithSameBloodGroup);

        const rec = new HelpRequest({
            ...requestData,
            requestedTo: [...nearbyUsers,...friends,...usersWithSameBloodGroup]
        })

        await rec.save();

        /*if(rec){
            const devTokens = await User.find({ _id : {$in: rec.requestedTo}}, {_id: 0}).select("deviceRegistrationTokens");

            devTokens = devTokens.map(t => {
                return [...t.deviceRegistrationTokens]
            })

            payload = {
                notification:{
                    title: rec.description,
                    body:  'NEED HELPPPPPP'
                }
            }
            notificationService.sendNotification(devTokens,payload);
        }
        */
        return rec;

        
    }

    async getHelpRequests(userId){
        return await HelpRequest.find({"requestedTo.uid": userId, 
                                       "requestedTo.status": {$in: ["Pending","Accepted"]} })
                                       .populate('creatorId','_id firstName lastName phone image location')
                                       .select("-requestedTo")
    }

    async takeAction(requestId, action,userId){

        await HelpRequest.updateOne( {$and: [{_id: requestId}, {'requestedTo.uid': userId}]} , 
            {
                $set: {
                 'requestedTo.$.status': action
                }
            }
        )

    }

    

}

module.exports = HelpRequestService;