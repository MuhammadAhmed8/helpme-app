const Mongoose = require('mongoose');

const Schema = Mongoose.Schema;


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

AppointmentsSchema.virtual('finder', {
    ref: 'User',
    localField: 'finderId', 
    foreignField: '_id' 
});

module.exports = Mongoose.model("Appointments", AppointmentsSchema);