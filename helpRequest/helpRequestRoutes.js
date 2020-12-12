const express = require("express");
const router = express.Router();
const {authenticateJWT} = require("../middlewares/auth");

const helpRequestController = require("./helpRequestController");
const helpRequestSchema = require("./helpRequestSchema");

router.use(authenticateJWT);
router.post("/help",helpRequestController.createHelpRequest);
router.post("/help/respond",helpRequestController.takeAction);


module.exports = router;
