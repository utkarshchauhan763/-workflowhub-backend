const express = require("express");
const { sendSuccess } = require("../utils/response");
const router = express.Router();

router.get("/health", (req, res) => {
    return sendSuccess(
        res,
        200,
        "Workflow API is healthy"
    );
});

module.exports = router;