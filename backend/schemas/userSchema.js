const Joi = require('joi');

const signUpSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).required(),
    role: Joi.string().valid('customer', 'seller', 'admin').default('customer'),
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

const editProfileSchema = Joi.object({
    full_name: Joi.string().min(3).max(100),
    address: Joi.string().min(5).max(200),
    phone: Joi.string().pattern(/^[0-9]+$/).length(10),
    avatar_url: Joi.string().uri(),
});

const changePasswordSchema = Joi.object({
    currentPassword: Joi.string().required(),
    newPassword: Joi.string().pattern(/^[a-zA-Z0-9]{8,30}$/).required(),
});

module.exports = {
    signUpSchema,
    loginSchema,
    editProfileSchema,
    changePasswordSchema
}