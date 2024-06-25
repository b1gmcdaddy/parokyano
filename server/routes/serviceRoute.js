const express = require('express');
const router = express.Router();

const{ retrieveAll, retrieveSchedule } = require('../controllers/serviceController')

router.get('/retrieve-all', retrieveAll)
router.get('/retrieve-schedule', retrieveSchedule)

module.exports = router