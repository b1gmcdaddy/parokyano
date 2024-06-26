const express = require('express');
const router = express.Router();

const{ retrieveAll, retrieveByParams, retrieveSchedule } = require('../controllers/serviceController')

router.get('/retrieve-all', retrieveAll)
router.get('/retrieveByParams', retrieveByParams)
router.get('/retrieve-schedule', retrieveSchedule)


module.exports = router