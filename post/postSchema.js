const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Comments = new Schema({
    creatorId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    content: {
        type: "String",
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now()
    }


});

const Post = new Schema({

    creatorId:{
        type: Schema.Types.ObjectId,
        required: true,
        index: true,
        unique: false
    },
    
    title:{
        type: "String",
        required: true,
        maxlength: 50
    },

    content: {
        type: "String",
        required: true
    },

    images:[
        {
            type:"String",
        }
    ],

    tags:[String],

    comments:[Comments],

    createdAt: {
        type: Date,
        default: Date.now()
    }
    


})

module.exports = mongoose.model('Post',Post);
