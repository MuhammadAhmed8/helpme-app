const express = require("express");

const router = express.Router();

const UserController = require("./userController");
const { model } = require("./userSchema");


router.put("/location",UserController.updateLocation);

module.exports = router;