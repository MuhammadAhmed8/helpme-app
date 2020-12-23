const HelpRequestService = require('../helpRequest/helpRequestService');
const ServicesService = require('./helpServicesService');

exports.getServices = async (req,res,next) => {

    try{
 
        const servicesService = new ServicesService();

        let name = req.params.name;

        let record;

        if(!name){
            record = await servicesService.getAllServices();
        }
        else{
            record = await servicesService.getServicesByName(name.trim());
        }

        res.status(200).json(record);

    }
    catch(e){
        next(e);
    }

}

exports.registerService = async (req,res,next) => {

    try{

        const servicesService = new ServicesService();

        let userId = req.user.id;
        let serviceName = req.body.name;

        const result = await servicesService.registerToService(userId,serviceName);

        res.status(200).json({
            success: true,
        });

    }
    catch(e){
        next(e);
    }

}


exports.servicesRequestReceived = async (req,res,next) => {

    try{
        let userId = req.user.id;
        let status = req.params.status;

        const servicesService = new ServicesService();
        const helpRequestService = new HelpRequestService();
        let serviceReq =  servicesService.allServicesAppointmentsGot(userId,status);
        let helpReq =  helpRequestService.getHelpRequests(userId);
        Promise.all([serviceReq,helpReq]).then(result => {
            console.log(result);
            return res.status(200).json({
                helpRequests: result[0],
                serviceRequests: result[1]
            });

        });

    }
    catch(e){
        next(e);
    }


}

exports.servicesRequestSent = async (req,res,next) => {

    try{
        let userId = req.user.id;
        let status = req.params.status;

        const servicesService = new ServicesService();
        const rec = servicesService.allServicesAppointmentsPosted(userId,status);

        res.status(200).json(rec);

    }
    catch(e){
        next(e);
    }

}

exports.findServiceProviders = async (req,res,next) => {
    try{
        let userId = req.user.id;
        let serviceName = req.params.serviceName;
        const servicesService = new ServicesService();
        const rec = await servicesService.findServiceProviders(serviceName);

        res.status(200).json(rec);

    }
    catch(e){
        next(e);
    }
}


exports.sendRequest = async (req,res,next) => {
    try{
        let userId = req.user.id;
        let spId = req.body.serviceProviderId;
        let serviceName = req.body.serviceName;
        const servicesService = new ServicesService();
        const rec = await servicesService.requestAppointment(spId,serviceName,userId);

        if(!rec){
            throw new Error('service Not found');
        }

        res.status(200).json({
            success: true
        })
    }
    catch(e){
        next(e);
    }
}

exports.respond = async (req,res,next) => {
    try{
        let userId = req.user.id;
        let aid = req.body.aid;
        let status = req.body.status;
        const servicesService = new ServicesService();
        servicesService.AcceptRejectAppointmentRequest(userId,aid,status);

        res.status(200).json({
            success: true
        })
    }
    catch(e){
        next(e);
    }
}
