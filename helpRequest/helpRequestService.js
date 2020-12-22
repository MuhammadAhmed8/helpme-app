const User = require("../user/userSchema");
const UserService = require("../user/userService");
const HelpRequest = require("./helpRequestSchema");
const notificationService = require("../shared/notification");


class HelpRequestService{

    constructor(){}

    async createHelpRequest(userLocation, requestData){

        const userService = new UserService();

        /*if( (await userService.isUserReputationValid(requestData.creatorId)) === false ){
            return -1;
        }*/

        let rad = 49;
        
        let nearbyUsers = await userService.findNearByUsers(userLocation.longitude, userLocation.latitude, rad );
        let friends = await userService.getFriendsIds(requestData.creatorId);

        nearbyUsers = nearbyUsers.map(u=>{
            return {uid : u._id}
        })

        friends = friends.friends.map(fid => {
            return {uid : fid}
        })

        console.log(nearbyUsers);
        console.log(friends);

        const rec = await HelpRequest.create({
            ...requestData,
            requestedTo: [...nearbyUsers,...friends]
        })

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

    async showRequest(){

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