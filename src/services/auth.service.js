const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const { generateToken } = require("../utils/jwt");

const registerUser = async({name, email, password}) => {
    // check whether the email already exists
    const existUser = await User.findOne({ email });
    if(existUser){
        const error = new Error("User with this email already exists");
        error.statusCode = 409;
        throw error;
    }
    const hashedPassword = await bcrypt.hash(password,12);
    // create the user
    const user = await User.create({
        name,email,password: hashedPassword
    });
    return user;
};


const loginUser = async({ email, password }) => {
    const user = await User.findOne({email}).select("+password");
    if(!user){
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }
    const isPasswordValid = await bcrypt.compare(
        password,
        user.password
    );

    if(!isPasswordValid){
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }

    const token = generateToken({
        userId: user._id,
        role: user.role
    });
    return {
        user,token
    };
}
module.exports = {
    registerUser,loginUser
};