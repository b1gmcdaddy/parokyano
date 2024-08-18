const express = require('express')
const router = express.Router()

const { retrieveAllUsers } = require('../controllers/userController')

router.get('/retrieveUsers', retrieveAllUsers)


module.exports = router;