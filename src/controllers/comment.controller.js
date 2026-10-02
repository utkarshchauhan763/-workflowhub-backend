const commentService = require("../services/comment.service");
const { sendSuccess } = require("../utils/response");

const createComment = async(req,res,next) => {
    try{
        const comment = await commentService.createComment(
            req.params.taskId,
            req.user._id,
            req.body.content
        );

        return sendSuccess(
            res,
            201,
            "Comment created successfully",
            comment
        );
    }catch(error){
        next(error);
    }
};
const getCommentsByTask = async (req, res, next) => {
    try {
        const comments = await commentService.getCommentsByTask(
            req.params.taskId
        );

        return sendSuccess(
            res,
            200,
            "Comments fetched successfully",
            comments
        );
    } catch (error) {
        next(error);
    }
};

const updateComment = async (req, res, next) => {
    try {
        const comment = await commentService.updateComment(
            req.params.id,
            req.user._id,
            req.body.content
        );

        return sendSuccess(
            res,
            200,
            "Comment updated successfully",
            comment
        );
    } catch (error) {
        next(error);
    }
};

const deleteComment = async (req, res, next) => {
    try {
        await commentService.deleteComment(
            req.params.id,
            req.user._id
        );

        return sendSuccess(
            res,
            200,
            "Comment deleted successfully"
        );
    } catch (error) {
        next(error);
    }
};



module.exports = { createComment,getCommentsByTask,updateComment,deleteComment };