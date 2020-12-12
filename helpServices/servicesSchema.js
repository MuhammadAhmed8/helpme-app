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
        ref: "Services"
    }

})


const AppointmentsSchema = new Schema({

    finderId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    serviceProviderId :{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    status: {
        type: String,
        enum: ['Pending','Rejected','Accepted'],
        default: 'Pending'
    },
    

},
{
    timestamps: true
})

module.exports = Mongoose.model("ServicesSchema", "Services");
module.exports = Mongoose.model("AppointmentsSchema", "Appointments");