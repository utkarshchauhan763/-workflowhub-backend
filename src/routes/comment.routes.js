const express = require("express");

const {
    createComment,getCommentsByTask,updateComment,deleteComment
} = require("../controllers/comment.controller");

const authenticate = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");

const {
    createCommentSchema,updateCommentSchema
} = require("../validators/comment.validator");

const router = express.Router();

router.post(
    "/tasks/:taskId/comments",
    authenticate,
    validate(createCommentSchema),
    createComment
);

router.get(
    "/tasks/:taskId/comments",
    authenticate,
    getCommentsByTask
);

router.patch("/comments/:id",authenticate,validate(updateCommentSchema),updateComment);

router.delete("/comments/:id",authenticate,deleteComment);

module.exports = router;