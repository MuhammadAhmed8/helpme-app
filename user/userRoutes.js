const multer = require("multer");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname + "/../public/" + '/uploads/images')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '.jpg') //Appending .jpg
    }
  })
const upload = multer({storage: storage});

const express = require("express");

const router = express.Router();

const UserController = require("./userController");
const { model } = require("./userSchema");


router.put("/location",UserController.updateLocation);

router.post("/friend",UserController.addFriend);
router.delete("/friend",UserController.removeFriend);


router.get("/profile/:personId",UserController.getProfile);

router.post("/deviceRegistrationToken", UserController.addDeviceRegistrationToken);

router.post("/review",UserController.giveReview);

router.post("/report", UserController.reportUser);

router.post('/upload/image', upload.single('photo'),UserController.uploadImage);

module.exports = router;