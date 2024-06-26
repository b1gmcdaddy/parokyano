const express = require('express');
const router = express.Router();
const { createIntention,  } = require('../controllers/requestController');

router.post('/create-intention', createIntention);
// router.get('/retrieve-all', retrieveAll);
// router.get('/retrieve-params', retrieveByParams);
// router.put('/update', updateRequest);
// router.delete('/delete', deleteRequest);

module.exports = router