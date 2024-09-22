import Joi from "joi";

export const permissionCreateBodyJ = Joi.object({
  title: Joi.string().min(3).max(30).required().messages({
    "string.base": "Title should be a type of text",
    "string.empty": "Title is required",
    "string.min": "Title should have a minimum length of {#limit}",
    "string.max": "Title should have a maximum length of {#limit}",
    "any.required": "Title is required",
  }),
  module: Joi.alternatives().try(
    Joi.string().valid("student", "staff", "attendance", "fees"),
    Joi.array().items(Joi.string().valid("staff"))
  ).required().messages({
    "any.only": "Module must be one of [staff]",
    "any.required": "Module is required",
  }),
  roleRead: Joi.boolean().optional().messages({
    "boolean.base": "roleRead should be a boolean value",
  }),
  roleUpdate: Joi.boolean().optional().messages({
    "boolean.base": "roleUpdate should be a boolean value",
  }),
  roleDelete: Joi.boolean().optional().messages({
    "boolean.base": "roleDelete should be a boolean value",
  }),
  roleCreate: Joi.boolean().optional().messages({
    "boolean.base": "roleDelete should be a boolean value",
  }),
});

export const permissionEditBodyJ = Joi.object({
  title: Joi.string().min(3).max(30).optional().messages({
    "string.base": "Title should be a type of text",
    "string.empty": "Title is required",
    "string.min": "Title should have a minimum length of {#limit}",
    "string.max": "Title should have a maximum length of {#limit}",
  }),
  module: Joi.alternatives().try(
    Joi.string().valid("student", "staff", "attendance", "fees"),
    Joi.array().items(Joi.string().valid("staff"))
  ).optional().messages({
    "any.only": "Module must be one of [staff]",
  }),
  roleRead: Joi.boolean().optional().messages({
    "boolean.base": "roleRead should be a boolean value",
  }),
  roleUpdate: Joi.boolean().optional().messages({
    "boolean.base": "roleUpdate should be a boolean value",
  }),
  roleDelete: Joi.boolean().optional().messages({
    "boolean.base": "roleDelete should be a boolean value",
  }),
  roleCreate: Joi.boolean().optional().messages({
    "boolean.base": "roleCreate should be a boolean value",
  }),
});
