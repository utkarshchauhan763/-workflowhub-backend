const express = require("express");
const { registerSchema,loginSchema } = require("../validators/auth.validator");
const validate = require("../middleware/validate.middleware");
const authorize = require("../middleware/authorize.middleware");
const { registerUser,loginUser,getMe,adminTest } = require("../controllers/auth.controller");
const router = express.Router();
const authenticate = require("../middleware/auth.middleware");

router.post("/register", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);
router.get("/me",authenticate,getMe);
router.get("/admin-test",authenticate,authorize("admin"),adminTest);

module.exports = router;