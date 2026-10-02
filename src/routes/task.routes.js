const express = require("express");
const { createTask,getTasks,getTaskById,updateTask,deleteTask } = require("../controllers/task.controller");

const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/authorize.middleware");

const validate = require("../middleware/validate.middleware");

const { createTaskSchema,updateTaskSchema} = require("../validators/task.validator");
const router = express.Router();

router.post(
    "/",
    authenticate,
    authorize("manager","admin"),
    validate(createTaskSchema),
    createTask
);

router.get("/",authenticate,getTasks);
router.get("/:id",authenticate,getTasks);

router.patch("/:id",authenticate,validate(updateTaskSchema),updateTask);

router.delete("/:id",authenticate,deleteTask);

module.exports = router;