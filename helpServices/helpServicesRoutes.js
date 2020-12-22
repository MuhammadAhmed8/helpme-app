const express = require('express');
const router = express.Router();
const serviceController = require('./helpServicesController');


router.get('/services/:name?',serviceController.getServices);

router.post('/services/register', serviceController.registerService);

router.post('/services/request',serviceController.sendRequest);

router.get('/services/request/received/:status?',serviceController.servicesRequestReceived);

router.get('/services/request/sent/:status?',serviceController.servicesRequestSent);

router.post('/services/request/respond',serviceController.respond);

router.get('/services/providers/:serviceName',serviceController.findServiceProviders);

module.exports = router;