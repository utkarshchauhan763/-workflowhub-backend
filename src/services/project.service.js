const Project = require("../models/project.model");
const createProject = async({
    name,
    description,
    status,
    startDate,
    endDate,
    owner
}) => {
    const project = await Project.create({
        name,
        description,
        status,
        startDate,
        endDate,
        owner
    });

    return project;
};

const getProjects = async(userId, role) => {
    let filter = {};
    if(role == "user"){
        filter = {
            $or: [
                { owner: userId },
                { members: userId }
            ]
        };
    }
    const projects = await Project.find(filter)
        .populate("owner", "name email")
        .populate("members", "name email")
        .sort({ createdAt: -1 });
    return projects;
};

const getProjectById = async (projectId, userId, role) => {
    let project;
    if(role == "user"){
        project = await Project.findOne({
            _id: projectId,
            $or: [
                { owner: userId },
                { members: userId }
            ]
        })
            .populate("owner", "name email")
            .populate("members", "name email");
    }else{
        project = await Project.findById(projectId)
            .populate("owner","name email")
            .populate("members", "name email");
    }

    if(!project){
        const error = new Error("Project not found");
        error.statusCode = 404;
        throw error;
    }
    return project;
}


const updateProject = async(projectId, userId, role, updateData) => {
    let project;
    if(role === "admin"){
        project = await Project.findByIdAndUpdate(
            projectId,
            updateData,
            {
                new: true,
                runValidators: true
            }
        );
    }else{
        project = await Project.findOneAndUpdate(
            {
                _id: projectId,
                owner: userId
            },
            updateData,
            {
                new: true,
                runValidators: true
            }
        );
    }
    if(!project){
        const error = new Error("Project not found or you do not have permission");
        error.statusCode = 404;
        throw error;
    }
    return project;
}

const deleteProject = async(projectId, userId, role) => {
    let project;
    if(role === "admin"){
        project = await Project.findByIdAndDelete(projectId);
    }else{
        project = await Project.findOneAndDelete({
            _id: projectId,
            owner: userId
        });
    }

    if(!project){
        const error = new Error(
            "Project not found or you do not have permission"
        );
        error.statusCode = 404;
        throw error;
    }
    return project;
};

module.exports = {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject
};
