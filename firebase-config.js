var admin = require("firebase-admin");

var serviceAccount = require("./fcm/fcm-service.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://helpme-3b128.firebaseio.com"
});