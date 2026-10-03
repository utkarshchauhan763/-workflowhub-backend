const express = require("express");

const {
    getMyNotifications,
    markAsRead
} = require("../controllers/notification.controller");

const authenticate = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");

const {
    notificationIdSchema
} = require("../validators/notification.validator");

const router = express.Router();

router.get(
    "/",
    authenticate,
    getMyNotifications
);

router.patch(
    "/:id/read",
    authenticate,
    validate(notificationIdSchema),
    markAsRead
);

module.exports = router;