const Joi = require("joi");
const createTaskSchema = Joi.object({
    title: Joi.string()
        .trim()
        .min(3)
        .max(150)
        .required(),
    description: Joi.string()
        .trim()
        .max(2000)
        .allow("", null),
    project: Joi.string()
        .hex()
        .length(24)
        .required(),
    assignedTo: Joi.string()
        .hex()
        .length(24)
        .optional(),
    status: Joi.string()
        .valid(
            "todo",
            "in_progress",
            "completed",
            "cancelled"
        )
        .default("todo"),
    priority: Joi.string()
        .valid(
            "low",
            "medium",
            "high",
            "urgent"
        )
        .default("medium"),
    dueDate: Joi.date()
        .optional()
});

const updateTaskSchema = Joi.object({
    title: Joi.string()
        .trim()
        .min(3)
        .max(150),

    description: Joi.string()
        .trim()
        .max(2000)
        .allow("", null),

    assignedTo: Joi.string()
        .hex()
        .length(24)
        .allow(null),

    status: Joi.string()
        .valid(
            "todo",
            "in_progress",
            "completed",
            "cancelled"
        ),

    priority: Joi.string()
        .valid(
            "low",
            "medium",
            "high",
            "urgent"
        ),

    dueDate: Joi.date()
        .allow(null)
})
.min(1);

module.exports = {
    createTaskSchema
};