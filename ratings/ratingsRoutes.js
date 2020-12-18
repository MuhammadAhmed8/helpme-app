const express = require('express');
const router = express.Router();
const ratingsController = require('./ratingsController')

router.post("/ratings",ratingsController.giveRating);


module.exports = router;