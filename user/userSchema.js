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

        salt: {
            type: String
        },

        createdAt:{
            type: Date,
            default: Date.now()
        },

        resetToken:{
            type: String
        },

        resetTokenExpiry: {
            type: Date
        }

    }
)

module.exports = mongoose.model('User',User);