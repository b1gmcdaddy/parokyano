const express = require('express');
const router = express.Router();

const{ retrieveAll } = require('../controllers/serviceController')

router.get('/services', retrieveAll)

module.exports = router