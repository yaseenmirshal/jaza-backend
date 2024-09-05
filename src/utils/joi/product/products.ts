import Joi from "joi";

export const productCreateJ = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "string.base": "Name should be a type of text",
    "string.empty": "Name is required",
    "string.min": "Name should have a minimum length of {#limit}",
    "string.max": "Name should have a maximum length of {#limit}",
    "any.required": "Name is required",
  }),
  description: Joi.string().required().messages({
    "string.base": "Description should be a type of text",
    "string.empty": "Description is required",
    "any.required": "Description is required",
  }),
  cloudinaryImageUrl: Joi.alternatives().try(
    Joi.string().uri().required(), 
    Joi.array().items(Joi.string().uri().required()) 
  ).required().messages({
    "alternatives.match": "Image must be either a single URL or an array of valid URLs",
    "string.uri": "Image must be a valid URL",
    "array.base": "Image must be an array of URLs",
    "any.required": "Image is required",
  }),
  price: Joi.number().integer().min(1).required().messages({
    "number.base": "Price should be a number",
    "number.min": "Price cannot be 0. It must be at least {#limit}",
    "any.required": "Price is required",
  }),  
  stock: Joi.number().integer().min(1).required().messages({
    "number.base": "Stock should be a number",
    "number.empty": "Stock is required",
    "any.required": "Stock is required",
  }),
  categories: Joi.string().valid("oils", "fragrances").required().messages({
    "string.base": "Category should be a type of text",
    "any.only": "Category must be one of 'oils' or 'fragrances'",
    "any.required": "Category is required",
  }),
  sex: Joi.string().valid("men", "women", "unisex").required().messages({
    "string.base": "Sex should be a type of text",
    "any.only": "Sex must be one of 'men', 'women', or 'unisex'",
    "any.required": "Sex is required",
  }),
  size: Joi.alternatives().try(
    Joi.string().valid("10ml", "50ml", "100ml").required(),
    Joi.array().items(Joi.string().valid("10ml", "50ml", "100ml")).required()
  ).required().messages({
    "alternatives.match": "Size must be either a valid string or an array of valid sizes",
    "any.only": "Size must be one of '10ml', '50ml', or '100ml'",
    "any.required": "Size is required",
  }),  
  quantity: Joi.number().integer().default(1).messages({
    "number.base": "Quantity should be a number",
  })
});



export const productUpdateJ = Joi.object({
  name: Joi.string().min(3).max(30).optional().messages({
    "string.base": "Name should be a type of text",
    "string.empty": "Name is required",
    "string.min": "Name should have a minimum length of {#limit}",
    "string.max": "Name should have a maximum length of {#limit}",
    "any.required": "Name is required",
  }),
  description: Joi.string().optional().messages({
    "string.base": "Description should be a type of text",
    "string.empty": "Description is required",
    "any.required": "Description is required",
  }),
  cloudinaryImageUrl: Joi.alternatives().try(
    Joi.string().uri().required(), 
    Joi.array().items(Joi.string().uri().required()) 
  ).required().messages({
    "alternatives.match": "Image must be either a single URL or an array of valid URLs",
    "string.uri": "Image must be a valid URL",
    "array.base": "Image must be an array of URLs",
    "any.required": "Image is required",
  }),
  price: Joi.number().integer().min(1).optional().messages({
    "number.base": "Price should be a number",
    "number.min": "Price cannot be 0. It must be at least {#limit}",
    "any.required": "Price is required",
  }),  
  stock: Joi.number().integer().optional().messages({
    "number.base": "Stock should be a number",
    "number.empty": "Stock is required",
    "any.required": "Stock is required",
  }),
  categories: Joi.string().valid("oils", "fragrances").optional().messages({
    "string.base": "Category should be a type of text",
    "any.only": "Category must be one of 'oils' or 'fragrances'",
    "any.required": "Category is required",
  }),
  sex: Joi.string().valid("men", "women", "unisex").optional().messages({
    "string.base": "Sex should be a type of text",
    "any.only": "Sex must be one of 'men', 'women', or 'unisex'",
    "any.required": "Sex is required",
  }),
  size: Joi.alternatives().try(
    Joi.string().valid("10ml", "50ml", "100ml").optional(),
    Joi.array().items(Joi.string().valid("10ml", "50ml", "100ml")).optional()
  ).optional().messages({
    "alternatives.match": "Size must be either a valid string or an array of valid sizes",
    "any.only": "Size must be one of '10ml', '50ml', or '100ml'",
    "any.required": "Size is required",
  }),
  quantity: Joi.number().integer().default(1).messages({
    "number.base": "Quantity should be a number",
  })
});