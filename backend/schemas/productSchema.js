const Joi = require('joi');

const createProductSchema = Joi.object({
    seller_id: Joi.number().integer().required(),
    category_id: Joi.number().integer().required(),
    name: Joi.string().max(100).required(),
    description: Joi.string().max(500).required(),
    price: Joi.number().positive().required(),
    stock: Joi.number().integer().min(0).required(),
    image_url: Joi.string().uri().optional()
});

const updateProductSchema = Joi.object({
    name: Joi.string().max(100).optional(),
    description: Joi.string().max(500).optional(),
    price: Joi.number().positive().optional(),
    stock: Joi.number().integer().min(0).optional(),
    image_url: Joi.string().uri().optional(),
    category_id: Joi.number().integer().optional()
});

const updateStockSchema = Joi.object({
    stock: Joi.number().integer().min(0).required()
});

const filterProductsSchema = Joi.object({
    name: Joi.string().max(100).optional(),
    price: Joi.number().positive().optional(),
    category_id: Joi.number().integer().optional()
});

module.exports = {
    createProductSchema,
    updateProductSchema,
    updateStockSchema,
    filterProductsSchema
};