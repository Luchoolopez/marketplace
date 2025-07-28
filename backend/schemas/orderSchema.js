const Joi = require('joi');

const orderItemSchema = Joi.object({
    product_id: Joi.number().integer().required(),
    quantity: Joi.number().integer().min(1).required(),
    unit_price: Joi.number().positive().required()
});

const createOrderSchema = Joi.object({
    customer_id: Joi.number().integer().required(),
    total_amount: Joi.number().positive().required(),
    status: Joi.string().valid('pending', 'processing', 'shipped', 'delivered', 'cancelled').optional(),
    items: Joi.array().items(orderItemSchema).min(1).required()
});

const updateOrderStatusSchema = Joi.object({
    status: Joi.string().valid('pending', 'processing', 'shipped', 'delivered', 'cancelled').required()
});

const getOrderByIdSchema = Joi.object({
    order_id: Joi.number().integer().required()
});

const deleteOrderSchema = Joi.object({
    order_id: Joi.number().integer().required()
});

module.exports = {
    createOrderSchema,
    updateOrderStatusSchema,
    getOrderByIdSchema,
    deleteOrderSchema
};