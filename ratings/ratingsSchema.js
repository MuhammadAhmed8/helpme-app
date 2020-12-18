const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RatingsSchema = new Schema({

    ratedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    ratedTo :  {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    score: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },

});

RatingsSchema.index({ratedTo: 1,ratedBy: 1}, {unique:true});

module.exports = mongoose.model("Ratings",RatingsSchema);