const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 150
        },

        description: {
            type: String,
            trim: true,
            maxlength: 2000
        },

        project: {
            type: mongoose.Schema.Types.ObjectId,// -> a task must belong to a project
            ref: "Project",
            required: true
        },

        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,// -> who
            ref: "User"
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        status: {
            type: String,
            enum: [
                "todo",
                "in_progress",
                "completed",
                "cancelled"
            ],
            default: "todo"
        },

        priority: {
            type: String,
            enum: [
                "low",
                "medium",
                "high",
                "urgent"
            ],
            default: "medium"
        },

        dueDate: {
            type: Date
        }
    },
    {
        timestamps: true
    }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;