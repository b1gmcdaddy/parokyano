const express = require('express');
const router = express.Router();
const { createRequestIntention, createRequestCertificate, retrieveByParams, createRequestBaptism, createRequestWedding, createRequestMass, createRequestAnointing } = require('../controllers/requestController');

router.post('/create-intention', createRequestIntention);
router.post('/create-certificate', createRequestCertificate);
router.post('/create-baptism', createRequestBaptism)
router.post('/create-wedding', createRequestWedding)
router.post('/create-mass', createRequestMass)
router.post('/create-anointing', createRequestAnointing)
// router.get('/retrieve-all', retrieveAll);
router.get('/retrieve', retrieveByParams);
// router.put('/update', updateRequest);
// router.delete('/delete', deleteRequest);

module.exports = router