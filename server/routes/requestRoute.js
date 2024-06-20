const express = require('express');
const router = express.Router();
const { createRequest, retrieveAll, retrieveByParams, updateRequest, deleteRequest } = require('../controllers/request');

router.post('/create', createRequest);
router.get('/retrieve-all', retrieveAll);
router.get('/retrieve-params', retrieveByParams);
router.put('/update', updateRequest);
router.delete('/delete', deleteRequest);