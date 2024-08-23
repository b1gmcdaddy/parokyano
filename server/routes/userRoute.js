const express = require('express')
const router = express.Router()

const { retrieveAllUsers, createUser, editUser } = require('../controllers/userController')

router.get('/retrieveUsers', retrieveAllUsers)
router.post('/createUser', createUser)
router.put('/editUser/:id', editUser)


module.exports = router;