const express = require('express');
const router = express.Router();
const { createRequestIntention, createRequestCertificate } = require('../controllers/requestController');

router.post('/create-intention', createRequestIntention);
router.post('/create-certificate', createRequestCertificate)
// router.get('/retrieve-all', retrieveAll);
// router.get('/retrieve-params', retrieveByParams);
// router.put('/update', updateRequest);
// router.delete('/delete', deleteRequest);

module.exports = router