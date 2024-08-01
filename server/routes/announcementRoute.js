const express = require('express')
const router = express.Router()

const { retrieveAll, createAnnouncement, editAnnouncement } = require('../controllers/announcementController')

router.post('/create', createAnnouncement)
router.get('/retrieve-all', retrieveAll)
router.put('/edit/:id', editAnnouncement)

module.exports = router