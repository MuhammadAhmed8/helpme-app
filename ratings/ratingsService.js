const Ratings = require("./ratingsSchema");
const User = require("../user/userSchema");
const Mongoose = require('mongoose');

class RatingsService{
    constructor(){}

    async giveRating(ratedBy,ratedTo,score){

        if(ratedBy === ratedTo){
            throw new Error("You cant rate yourself");
        }

        let exists = await User.findOne({_id: ratedTo}).countDocuments();

        if(exists === 0)
            throw new Error("ratedTo ObjectID doesnt exist");

        await Ratings.updateOne(
            {ratedTo: ratedTo, ratedBy: ratedBy},
            {
                ratedBy: ratedBy,
                ratedTo: ratedTo,
                score: score
            },
            {upsert: true}

        );
        

        
    }


    async getRating(userId){
        let arrayOfRating = await Ratings.aggregate([
            {
                $match: {ratedTo: Mongoose.Types.ObjectId(userId)}
            }, 
            {
                $group: {
                    _id: "$ratedTo",
                    avgRating: { $avg : "$score" }
                }
            }
        ]);

        return arrayOfRating.reduce(rating => { return rating.avgRating } );    // {_id, avgRating}

    }

}

module.exports = RatingsService;