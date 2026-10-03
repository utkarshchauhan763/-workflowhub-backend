const Joi = require("joi");
const notificationSchema = Joi.object({
    id: Joi.string()
        .hex()
        .length(24)
        .required()
});

module.exports = {
    notificationSchema
}