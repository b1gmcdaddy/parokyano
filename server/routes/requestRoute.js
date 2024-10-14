const express = require("express");
const router = express.Router();
const { authenticateStaff } = require("../middleware/authMiddleware");
const {
  createRequestIntention,
  createRequestCertificate,
  retrieveByParams,
  getRequestSummary,
  getSummaryWithTypeParam,
  createRequestBaptism,
  createRequestWedding,
  createRequestMass,
  createRequestAnointing,
  createRequestBlessing,
  retrieveMultipleParams,
  approveService,
  approveIntention,
  approveCertificate,
  retrieveMultipleDateFiltered,
  getCount,
  retrieveRequests,
  retrieveCerts,
  getCountRequests,
  getCountCerts,
  searchIntentions,
  searchCertRecords,
  updateByParams,
  updateBulk,
} = require("../controllers/requestController");

router.post("/create-intention", createRequestIntention);
router.post("/create-certificate", createRequestCertificate);
router.post("/create-baptism", createRequestBaptism);
router.post("/create-wedding", createRequestWedding);
router.post("/create-mass", createRequestMass);
router.post("/create-anointing", createRequestAnointing);
router.post("/create-blessing", createRequestBlessing);
// router.get('/retrieve-all', retrieveAll);
router.get("/retrieve", retrieveByParams);
router.get("/retrieve-multiple", retrieveMultipleParams);
router.get("/count", getCount);
router.get("/summary", getRequestSummary);
router.get("/type-summary", getSummaryWithTypeParam);
router.put("/approve-service", approveService);
router.put("/approve-intention", approveIntention);
router.put("/approve-cert", approveCertificate);
// router.delete('/delete', deleteRequest);
router.get("/retrieve-request", retrieveRequests);
router.get("/retrieve-certs", retrieveCerts);
router.get("/count-certs", getCountCerts);
router.get("/count-request", getCountRequests);
router.get("/search", searchIntentions);
router.get("/search-records", searchCertRecords);
router.get("/retrieve-multiple-byDate", retrieveMultipleDateFiltered);
router.put("/update", updateByParams);
router.put("/update-bulk", updateBulk);

module.exports = router;
