const Mongoose = require('mongoose');

const Schema = Mongoose.Schema;

const ServicesSchema = new Schema({

    name: {
        type: String,
        index: true,
        unique: true,
        required: true
    },

    parent: {
        type: Schema.Types.ObjectId,
        ref: "Services",
    }

})



module.exports = Mongoose.model("Services", ServicesSchema);
