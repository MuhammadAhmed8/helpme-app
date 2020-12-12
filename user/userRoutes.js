const express = require("express");

const router = express.Router();

const UserController = require("./userController");
const { model } = require("./userSchema");


router.put("/location",UserController.updateLocation);

router.post("/friend",UserController.addFriend);

router.get("/profile/:userId",UserController.getProfile);

module.exports = router;