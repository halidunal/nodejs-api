const joi = require("joi");
const APIError = require("../../utils/errors");

class AuthValidation{
    constructor() {}

    static register = async (req, res, next) => {
        try {
            await joi.object({
                username: joi.string().trim().min(3).max(50).required().messages({
                    "string.base": "Invalid username",
                    "string.empty": "Username cannot be empty",
                    "string.min": "Username must be at least 3 characters",
                    "string.max": "Username cannot exceed 50 characters",
                    "string.required": "Username is required"
                }),
                email: joi.string().email().trim().min(6).max(50).required().messages({
                    "string.base": "Invalid email",
                    "string.email": "Invalid email",
                    "string.empty": "Email cannot be empty",
                    "string.min": "Email must be at least 6 characters",
                    "string.max": "Email cannot exceed 50 characters",
                    "string.required": "Email is required"
                }),
                password: joi.string().trim().min(6).max(50).required().messages({
                    "string.base": "Invalid password",
                    "string.empty": "Password cannot be empty",
                    "string.min": "Password must be at least 6 characters",
                    "string.max": "Password cannot exceed 50 characters",
                    "string.required": "Password is required"
                }),
            }).validateAsync(req.body)
        } catch(error) {
            if(error.details && error?.details[0].message) throw new APIError(error.details[0].message, 400)
            else throw new APIError("Validation error", 400)
        }
        next();
    }

    static login = async (req, res, next) => {
        try {
            await joi.object({
                email: joi.string().email().trim().min(6).max(50).required().messages({
                    "string.base": "Invalid email",
                    "string.email": "Invalid email",
                    "string.empty": "Email cannot be empty",
                    "string.min": "Email must be at least 6 characters",
                    "string.max": "Email cannot exceed 50 characters",
                    "string.required": "Email is required"
                }),
                password: joi.string().trim().min(6).max(50).required().messages({
                    "string.base": "Invalid password",
                    "string.empty": "Password cannot be empty",
                    "string.min": "Password must be at least 6 characters",
                    "string.max": "Password cannot exceed 50 characters",
                    "string.required": "Password is required"
                }),
            }).validateAsync(req.body)            
        } catch (error) {
            if(error.details && error?.details[0].message) throw new APIError(error.details[0].message, 400)
            else throw new APIError("Validation error", 400)
        }
        next();
    }
}

module.exports = AuthValidation