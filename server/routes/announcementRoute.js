const express = require('express')
const router = express.Router()

const { retrieveAll, createAnnouncement } = require('../controllers/announcementController')

router.get('/create', createAnnouncement)
router.get('/retrieve-all', retrieveAll)

module.exports = router