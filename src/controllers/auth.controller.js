const authService = require("../services/auth.service");
const { sendSuccess } = require("../utils/response");

const registerUser = async(req,res,next)=>{
    try{
        const user = await authService.registerUser(req.body);

        return sendSuccess(
            res,
            201,
            "User registered successfully",
            {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }

        )
    }
    catch(error){
        next(error);
    }
};

const loginUser = async(req,res,next)=>{
    try{
        const {user,token} = await authService.loginUser(req.body);
        return sendSuccess(
            res,
            200,
            "Login successful",
            {
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            }

        );
    }
    catch(error){
        next(error);
    }
};

const getMe = async(req,res,next) => {
    try{
        return sendSuccess(
            res,
            200,
            "User profile fetched successfully",
            {
                id: req.user._id,
                name: req.user.name,
                email: req.user.email,
                role: req.user.role
            }
        );
    }catch(error){
        next(error);
    }
}

module.exports = {
    registerUser,
    loginUser,
    getMe
};