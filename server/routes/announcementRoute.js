const express = require('express')
const router = express.Router()

const { retrieveAll } = require('../controllers/announcementController')

router.get('/retrieve-all', retrieveAll)

module.exports = router