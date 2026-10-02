const express = require("express");
const  { createProject,getProjects,getProjectById,updateProject,deleteProject } = require("../controllers/project.controller");
const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/authorize.middleware");
const validate = require("../middleware/validate.middleware");

const { createProjectSchema, updateProjectSchema } = require("../validators/project.validator");

const router = express.Router();

router.post("/",authenticate,authorize("manager","admin"),validate(createProjectSchema),createProject);
router.get("/",authenticate,getProjects);
router.get("/:id", authenticate,getProjectById);
router.patch("/:id",authenticate,authorize("manager","admin"),validate(updateProjectSchema),updateProject);
router.delete("/:id",authenticate,authorize("manager","admin"),deleteProject);
module.exports = router;


