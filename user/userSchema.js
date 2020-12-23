const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema(
    {
        phone: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },

        email: {
            type: String,
            required: true,
        },

        password: {
            type: String,
            required: true
        },

        firstName: {
            type: String,
            required: true
        },

        lastName: {
            type: String,
            required: true
        },

        gender: {
            type: String,
            enum: ['male','female']
        },

        dob: {
            type: Date,
            required: true
        },

        image: {
            type: String,
            default: "no dp",
        },

        location:{
            type:{type:String},
            coordinates:[]
        },

        salt: {
            type: String
        },

        resetToken:{
            type: String
        },

        resetTokenExpiry: {
            type: Date
        },

        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ],

        services: [
            {   
                type: Schema.Types.ObjectId,
                ref: "ServicesSchema"
            }
        ],

        reputation:{
            type: Number
        },

        reviews: [
            {
                content: String,
                authorId: {
                    type: Schema.Types.ObjectId,
                    ref: 'User'
                },
            
            }
        ],

        deviceRegistrationTokens:[
            {
                type:String,
                unique: true
            }
        ],

        reports:[
            {
                label:String,
                reportedBy: {
                    type: Schema.Types.ObjectId,
                    ref: 'User'
                }
            }
        ],

        bloodGroup: {
            type: String,
        }



    },

    {timestamps: true}
)

User.index({
    location:"2dsphere"
});

module.exports = mongoose.model('User',User);