import Joi from "joi";

export const roleCreateBodyJ = Joi.object({
    title: Joi.string().min(3).max(30).required().messages({
        "string.base": "Title should be a type of text",
        "string.empty": "Title is required",
        "string.min": "Title should have a minimum length of {#limit}",
        "string.max": "Title should have a maximum length of {#limit}",
        "any.required": "Title is required",
    }),
    permissionIds: Joi.alternatives().try(
        Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)),
        Joi.string().pattern(/^[0-9a-fA-F]{24}$/)
    ).required().messages({
        "array.base": "Permission IDs should be an array of strings or a single string",
        "string.pattern.base": "Each Permission ID must be a valid MongoDB ObjectId",
        "any.required": "Permission IDs are required"
    })
});

export const roleEditBodyJ = Joi.object({
    title: Joi.string().min(3).max(30).optional().messages({
        "string.base": "Title should be a type of text",
        "string.min": "Title should have a minimum length of {#limit}",
        "string.max": "Title should have a maximum length of {#limit}",
    }),
    permissionIds: Joi.alternatives().try(
        Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/)),
        Joi.string().pattern(/^[0-9a-fA-F]{24}$/)
    ).optional().messages({
        "array.base": "Permission IDs should be an array of strings or a single string",
        "string.pattern.base": "Each Permission ID must be a valid MongoDB ObjectId",
    })
});
