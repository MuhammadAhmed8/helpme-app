const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const HelpRequest = new Schema({
    
    creatorId: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: 'User'
    },

    status: {
        type: String,
        enum: ['Pending', 'Accepted','Rejected','Completed'],
        default: "Pending",
    },

    requestedTo: [
        {
            _id: false,
            uid : { type: Schema.Types.ObjectId,ref: 'User'},
            status: {
                type: String,
                enum: ['Pending','Rejected','Accepted','Completed'],
                default: 'Pending'
            }
    
        }
    ],
    
    Category: {
        type: String
    },
    
    description: {
        type: String,
        required: false,
    },

    bloodGroup:{
        type: String
    },

    urgencyLevel : {
        type:String,
        enum: ['Low','Moderate','High'],
        default: 'Low'     
    },

    nearbyUsersAllowed: {
        type : Boolean,
        default: true
    }

}, {
    timestamps: true
})


module.exports = mongoose.model('HelpRequest',HelpRequest);