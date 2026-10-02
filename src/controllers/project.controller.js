const projectService = require("../services/project.service");
const { sendSuccess } = require("../utils/response");

const createProject = async(req,res,next) => {
    try{
        const project = await projectService.createProject({
            ...req.body,
            owner: req.user._id
        });
        return sendSuccess(
            res,
            201,
            "Project created successfully",
            project
        );
    }
    catch(error){
        next(error);
    }
};

const getProjects = async(req,res,next) => {
    try{
        const projects = await projectService.getProjects(req.user._id,req.user.role);
        return sendSuccess(
            res,
            200,
            "Project fetched successfully",
            projects
        );
    }catch (error){
        next(error);
    }
};

const getProjectById = async(req,res,next) => {
    try{
        const project = await projectService.getProjectById(req.params.id,req.user._id,req.user.role);
        return sendSuccess(
            res,
            200,
            "Project fetched successfully",
            project
        )
    }
    catch(error){
        next(error);
    }
}

const updateProject = async(req,res,next) => {
    try{
        const project = await projectService.updateProject(
            req.params.id,
            req.user._id,
            req.user.role,
            req.body
        );
        return sendSuccess(
            res,
            200,
            "Project updated successfully",
            project
        );
    }
    catch(error){
        next(error);
    }
};

const deleteProject = async (req, res, next) => {
    try {
        await projectService.deleteProject(
            req.params.id,
            req.user._id,
            req.user.role
        );

        return sendSuccess(
            res,
            200,
            "Project deleted successfully"
        );
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject
};