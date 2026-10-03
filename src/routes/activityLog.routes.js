const express = require("express");
const { getActivityLogs } = require("../controllers/activityLog.controller");
const authenticate = require("../middleware/auth.middleware");
const authorize = require('../middleware/authorize.middleware');

const router = express.Router();

router.get("/", authenticate, authorize("admin"), getActivityLogs);

module.exports = router;
