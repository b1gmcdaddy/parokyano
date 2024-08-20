const express = require('express')
const router = express.Router()

const { retrieveAllUsers, createUser } = require('../controllers/userController')

router.get('/retrieveUsers', retrieveAllUsers)
router.post('/createUser', createUser)


module.exports = router;