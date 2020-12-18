const RatingsService = require("./ratingsService");
const ratingsService = new RatingsService();

exports.giveRating = async (req,res,next) => {

    try{
        
        const {ratedTo,score} = req.body;
        const ratedBy = req.user.id;

        await ratingsService.giveRating(ratedBy,ratedTo,score);

        res.status(200).json({
            success: true
        });

    }
    catch(e){
        next(e);
    }

}

exports.getRating = async (req,res,next) => {

    try{
        
        const {ratedTo} = req.params;

        const userId = req.user.id;

        const rec = await ratingsService.getRating(ratedTo);        // {_id, avgRating}

        res.status(200).json(rec);

    }
    catch(e){
        next(e);
    }


}