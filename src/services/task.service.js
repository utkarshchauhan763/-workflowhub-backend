const Project = require("../models/project.model");
const Task = require("../models/task.model");
const User = require("../models/user.model");

const createTask = async ({
    title,
    description,
    project,
    assignedTo,
    status,
    priority,
    dueDate,
    createdBy
}) => {
    // 1. Check whether the project exists
    const existingProject = await Project.findById(project);

    if (!existingProject) {
        const error = new Error("Project not found");
        error.statusCode = 404;
        throw error;
    }

    // 2. Check whether the assigned user exists
    if (assignedTo) {
        const assignedUser = await User.findById(assignedTo);

        if (!assignedUser) {
            const error = new Error("Assigned user not found");
            error.statusCode = 404;
            throw error;
        }

        // 3. Check whether the assigned user belongs to the project
        const isProjectMember =
            existingProject.owner.equals(assignedTo) ||
            existingProject.members.some(
                (memberId) => memberId.equals(assignedTo)
            );

        if (!isProjectMember) {
            const error = new Error(
                "Assigned user is not a member of this project"
            );
            error.statusCode = 400;
            throw error;
        }
    }

    // 4. Create the task
    const task = await Task.create({
        title,
        description,
        project,
        assignedTo,
        status,
        priority,
        dueDate,
        createdBy
    });

    return task;
};

const getTasks = async(userId, role) => {
    let filter = {};
    if(role === "user"){
        const userProjects = await Project.find({
            $or: [
                { owner: userId },
                { members: userId }
            ]
        }).select("_id");
        const projectIds = userProjects.map((project) => project._id);

        filter = {
            $or: [
                { project: { $in: projectIds }},
                { assignedTo: userId }
            ]
        };
    }
    const tasks = await Task.find(filter)
        .populate("project","name status")
        .populate("assignedTo","name email")
        .populate("createdBy", "name email")
        .sort({ createdAt: -1});
    return tasks;

}

const getTaskById = async (taskId, userId, role) => {
    let task;

    if (role === "user") {
        const projectIds = await Project.find({
            $or: [
                { owner: userId },
                { members: userId }
            ]
        }).select("_id");

        task = await Task.findOne({
            _id: taskId,
            $or: [
                {
                    project: {
                        $in: projectIds.map((project) => project._id)
                    }
                },
                {
                    assignedTo: userId
                }
            ]
        })
            .populate("project", "name status")
            .populate("assignedTo", "name email")
            .populate("createdBy", "name email");
    } else {
        task = await Task.findById(taskId)
            .populate("project", "name status")
            .populate("assignedTo", "name email")
            .populate("createdBy", "name email");
    }

    if (!task) {
        const error = new Error("Task not found");
        error.statusCode = 404;
        throw error;
    }

    return task;

};

const updateTask = async(
    taskId,
    userId,
    role,
    updateData
) => {
    const task = await Task.findById(taskId);
    if(!task){
        const error = new Error("Task not found");
        error.statusCode = 404;
        throw error;
    }
    if(role === "admin"){
        Object.assign(task,updateData);
        await task.save();
        return task;
    }
    if(role === "manager"){
        if(!task.createdBy.equals(userId)){
            const equals = new Error(
                "You do not have permission to update this task"
            );
            error.statusCode = 403;
            throw error;
        }
        Object.assign(task,updateData);
        await task.save();
        return task;
    }

    if(role === "user"){
        if(!task.assignedTo || !task.assignedTo.equals(userId)){
            const error = new Error(
                "You do not have permission to update this task"
            );
            error.statusCode = 403;
        }
        const allowedUpdates = {};
        if(updateData.status !== undefined){
            allowedUpdates.status = updateData.status;
        }

        Object.assign(task,allowedUpdates);
        await task.save();
        return task;

    }
    return task;
}

const deleteTask = async(taskId, userId, role) => {
    const task = await Task.findById(taskId);

    if(!task){
        const error = new Error("Task not found");
        error.statusCode = 404;
        throw error;
    }
    if(role === "admin"){
        await Task.findByIdAndDelete(taskId);
        return;
    }
    if(role === "manager"){
        if(!task.createdBy.equals(userId)){
            const error = new Error("You do not have permission to delete this task");
            error.statusCode = 403;
            throw error;
        }
        await Task.findByIdAndDelete(taskId);
        return;
    }
    const error = new Error("You do not have permission to delete this task");
    error.statusCode = 403;
    throw error;
}


module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
};