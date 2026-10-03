const Joi = require("joi");
const createProjectSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(3)
        .max(100)
        .required(),
    description: Joi.string()
        .trim()
        .max(1000)
        .allow("", null),
    status: Joi.string()
        .valid("planning", "active", "completed", "archived")
        .default("planning"),
    startDate: Joi.date()
        .optional(),
    endDate: Joi.date()
        .greater(Joi.ref("startDate"))
        .optional()
});

const updateProjectSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(3)
        .max(100),
    description: Joi.string()
        .trim()
        .max(1000)
        .allow("", null),
    members: Joi.array()
        .items(
            Joi.string()
                .hex()
                .length(24)
        ),
    status: Joi.string()
        .valid("planning", "active", "completed", "archived"),
    startDate: Joi.date(),
    endeDate: Joi.date(),

})
    .min(1);
module.exports = {
    createProjectSchema,
    updateProjectSchema
};
