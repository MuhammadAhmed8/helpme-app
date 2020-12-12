const admin = require("../firebase-config");

const port = 3000

function sendNotification(registrationToken,message){

    const notification_options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
    };
    
    admin.messaging().sendToDevice(registrationToken, message, notification_options)
    .catch( error => {
        console.log(error);
    });

}

