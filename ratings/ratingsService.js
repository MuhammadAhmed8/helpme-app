const Ratings = require("./ratingsSchema")

class RatingsService{
    constructor(){}

    async giveRating(ratedBy,ratedTo,score){
        return await Ratings.create({
                ratedBy: ratedBy,
                ratedTo: ratedTo,
                score: score
            });
    }



}

module.exports = RatingsService;