const { required } = require("joi");
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 100
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
            select: false
            // select false => password hashes won't normally be returned when we query a user.

        },
        role: {
            type: String,
            enum: ["user","manager","admin"],
            default: "user"
        },
        isActive: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
        // Mongoose automatically adds:createdAt & updatedAt


    }
);

const User = mongoose.model("User",userSchema);
module.exports = User;