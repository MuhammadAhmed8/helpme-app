const express = require('express');
const router = express.Router();
const ratingsController = require('./ratingsController')

router.post("/ratings",ratingsController.giveRating);
router.get("/ratings/:ratedTo",ratingsController.getRating);


module.exports = router;