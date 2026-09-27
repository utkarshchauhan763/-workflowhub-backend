const express = require("express");
const { registerSchema,loginSchema } = require("../validators/auth.validator");
const validate = require("../middleware/validate.middleware");
const { registerUser,loginUser,getMe } = require("../controllers/auth.controller");
const router = express.Router();
const authenticate = require("../middleware/auth.middleware");

router.post("/register", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);
router.get("/me",authenticate,getMe);

module.exports = router;