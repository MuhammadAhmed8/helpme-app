const admin = require("../firebase-config");


exports.sendNotification = (registrationTokens,message) => {

    const notification_options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
    };
    
    admin.messaging().sendToDevice(registrationTokens, message, notification_options)
    .catch( error => {
        console.log(error);
    });

}

