const mongoose = require("mongoose");
const projectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minLength: 3,
            maxLength: 100
        },
        description: {
            type: String,
            trim: true,
            maxLength: 1000
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        status: {
            type: String,
            enum: ["planning","active","completed","archived"],
            default: "planning"
        },
        startDate: {
            type: Date
        },
        endDate: {
            type: Date
        }

    },{
        timestamps: true
    }
);

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;