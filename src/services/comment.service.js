const Comment = require("../models/comment.model");
const Task = require("../models/task.model");
const activityLogService = require("./activityLog.service");

const createComment =  async(taskId, authorId, content) => {
    const task = await Task.findById(taskId);
    if(!task){
        const error = new Error("task not found");
        error.statuCode = 404;
        throw error;
    }
    const comment = await Comment.create({
        task: taskId,
        author: authorId,
        content
    });
    
    await activityLogService.createActivityLog({
        user: authorId,
        action: "created",
        resource: "Comment",
        resourceId: comment._id,
        details: `Created comment on task: ${taskId}`
    });

    return comment;
};

const getCommentsByTask = async (taskId) => {
    const task = await Task.findById(taskId);

    if (!task) {
        const error = new Error("Task not found");
        error.statusCode = 404;
        throw error;
    }

    const comments = await Comment.find({
        task: taskId
    })
        .populate("author", "name email")
        .sort({ createdAt: -1 });

    return comments;
};

const updateComment = async (commentId, userId, content) => {
    const comment = await Comment.findById(commentId);

    if (!comment) {
        const error = new Error("Comment not found");
        error.statusCode = 404;
        throw error;
    }

    if (!comment.author.equals(userId)) {
        const error = new Error(
            "You do not have permission to update this comment"
        );
        error.statusCode = 403;
        throw error;
    }

    comment.content = content;

    await comment.save();

    await activityLogService.createActivityLog({
        user: userId,
        action: "updated",
        resource: "Comment",
        resourceId: comment._id,
        details: "Updated comment"
    });
    return comment;
};

const deleteComment = async (commentId, userId) => {
    const comment = await Comment.findById(commentId);

    if (!comment) {
        const error = new Error("Comment not found");
        error.statusCode = 404;
        throw error;
    }

    if (!comment.author.equals(userId)) {
        const error = new Error(
            "You do not have permission to delete this comment"
        );
        error.statusCode = 403;
        throw error;
    }

    await Comment.findByIdAndDelete(commentId);
    await Comment.findByIdAndDelete(commentId);

    await activityLogService.createActivityLog({
        user: userId,
        action: "deleted",
        resource: "Comment",
        resourceId: comment._id,
        details: "Deleted comment"
    });
};

module.exports = {
    createComment,
    getCommentsByTask,
    updateComment,
    deleteComment
};
