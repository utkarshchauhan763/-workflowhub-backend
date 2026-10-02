const taskService = require("../services/task.service");
const { sendSuccess } = require("../utils/response");

const createTask = async(req,res,next) => {
    try{
        const task = await taskService.createTask(
            {
                ...req.body,
                createdBy: req.user._id
            }
        );
        return sendSuccess(
            res,
            201,
            "Task created successfully",
            task
        );
    } catch(error){
        next(error);
    }
};

const getTasks = async(req,res,next) => {
    try{
        const tasks = await taskService.getTasks(req.user._id,req.user.role);
        return sendSuccess(
            res,
            200,
            "Tasks fetched successfully",
            tasks
        );
    } catch(error){
        next(error);
    }
};

const getTaskById = async (req, res, next) => {
    try {
        const task = await taskService.getTaskById(
            req.params.id,
            req.user._id,
            req.user.role
        );

        return sendSuccess(
            res,
            200,
            "Task fetched successfully",
            task
        );
    } catch (error) {
        next(error);
    }
};
const updateTask = async (req, res, next) => {
    try {
        const task = await taskService.updateTask(
            req.params.id,
            req.user._id,
            req.user.role,
            req.body
        );

        return sendSuccess(
            res,
            200,
            "Task updated successfully",
            task
        );
    } catch (error) {
        next(error);
    }
};

const deleteTask = async(req,res,next) => {
    try{
        await taskService.deleteTask(
            req.params.id,
            req.user._id,
            req.user.role
        );
        return sendSuccess(res,200,"Task deleted successfully");
    }
    catch(error){
        next(error);
    }
};


module.exports = {
    createTask,getTasks,getTaskById,updateTask,deleteTask
};