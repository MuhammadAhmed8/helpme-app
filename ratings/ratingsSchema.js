const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RatingsSchema = new Schema({

    ratedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    userId :  {
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