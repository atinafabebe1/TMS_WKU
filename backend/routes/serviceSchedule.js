const express = require('express');

const { createServiceSchedule, getServiceSchedule, updateServiceSchedule, deleteServiceSchedule } = require('../controllers/serviceSchedule');
const advancedResult = require('../middleware/advancedResult');
const { Auth, Authorize } = require('../middleware/auth');
const ServiceSchedule = require('../models/serviceSchedule');
const { ROLE_HEADOFDEPLOYMENT } = require('../constants');
const router = express.Router();

router.post('/work-day', Auth, Authorize(ROLE_HEADOFDEPLOYMENT), createServiceSchedule);
router.get('/work-day', advancedResult(ServiceSchedule, 'vehicles'), getServiceSchedule);
router.put('/work-day', Auth, Authorize(ROLE_HEADOFDEPLOYMENT), updateServiceSchedule);
router.delete('/work-day', Auth, deleteServiceSchedule);

module.exports = router;
