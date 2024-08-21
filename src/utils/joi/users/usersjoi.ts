import Joi from "joi";

const usersJoi = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "string.base": "Name should be a type of text",
    "string.empty": "Name is required",
    "string.min": "Name should have a minimum length of {#limit}",
    "string.max": "Name should have a maximum length of {#limit}",
    "any.required": "Name is required"
  }),

  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{8,30}$"))
    .required()
    .messages({
      "string.base": "Password should be a type of text",
      "string.empty": "Password is required",
      "string.pattern.base":
      "Password must be between 8 ",
      "any.required": "Password is required"
    }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "string.base": "Email should be a type of text",
      "string.empty": "Email is required",
      "string.email": "Email must be a valid email address",
      "any.required": "Email is required"
    }),

  profileImg: Joi.string().messages({
    "string.base": "Profile image should be a type of text"
  }),
  phone: Joi.string()
  .pattern(new RegExp("^((\\+91)|(91))?[6-9]\\d{9}$"))
  .required()
  .messages({
    "string.base": "Phone number should be a type of text",
    "string.empty": "Phone number is required",
    "any.required": "Phone number is required",
    "string.pattern.base": "Enter a valid phone number with country code"
  })
});

export default usersJoi;