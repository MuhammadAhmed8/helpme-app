const serviceSchema = require('./servicesSchema');
const User = require('../user/userSchema');
const appointmentsSchema = require('./appointmentsSchema');

class Service{
    constructor(){}

    async registerToService(userId,serviceName){

        const service = await serviceSchema.findOne({name: serviceName.toLowerCase()});
        
        if(!service)
            throw new Error('Service not found');

        if(await User.findOne({'services': service._id})) {
            throw new Error('Already registered');
        }

        await User.updateOne({_id: userId}, {
            $push: {
                services: service._id
            }
        });

        return true;

    }

    async addServices(serviceName, parentName){

        const p = parentName && await serviceSchema.findOne({name: parentName}, {_id : 1});
        console.log(p);

        const newService = await serviceSchema.create({
            'name': serviceName.toLowerCase(),
            'parent': p && p._id
        })

        return newService;

    }

    async getServicesByName(serviceName){
        let re = '.*' + serviceName + '.*'; 
        return await serviceSchema.find( { name: {$regex: serviceName , $options: 'i' } } );
    }

    async getAllServices(){
        return await serviceSchema.find({});
    }

    async findServiceProviders(serviceName){
        const s = await serviceSchema.findOne({name: serviceName.toLowerCase()});
        if(!s){
            throw new Error("service doesnt exist");
        }

        return await User.find({services: s._id}).select("_id firstName lastName phone image");
    }

    async requestAppointment(serviceProviderId,serviceName,userId){

        const service = await serviceSchema.findOne({name: serviceName}).select("_id");

        if(!service) return;

        return await appointmentsSchema.create({
            'finderId': userId,
            'serviceProviderId': serviceProviderId,
            'serviceId': service._id
        });

    }

    async AcceptRejectAppointmentRequest(userId,appointmentId,status){
        await appointmentsSchema.updateOne({_id: appointmentId, serviceProviderId: userId}, {$set: {status: status}});
    }

    async allServicesAppointmentsGot(userId,status){
        console.log(userId);
        return await appointmentsSchema.find({serviceProviderId: userId});
    }

    async allServicesAppointmentsPosted(userId, status){
        return await appointmentsSchema.find({finderId: userId, status: status}).sort({createdAt: -1}).limit(10);
    }

}



module.exports = Service;



