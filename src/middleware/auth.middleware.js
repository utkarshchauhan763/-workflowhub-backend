const User = require("../models/user.model");
const {verifyToken} = require("../utils/jwt");
const authenticate = async(req,res,next) => {
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            const error = new Error("Authentication required");
            error.statusCode = 401;
            throw error;
        }

        const token = authHeader.split(" ")[1];
        const decoded = verifyToken(token);
        const user = await User.findById(decoded.userId);

        if(!user){
            const error = new Error("User not found");
            error.statusCode = 401;
            throw error;
        }
        req.user = user;
        next();
        
    }catch(error){
        if(!error.statusCode){
            error.statusCode = 401;
            error.message = "Invalid or expired token";
        }

        next(error);
    }
};

module.exports = authenticate;