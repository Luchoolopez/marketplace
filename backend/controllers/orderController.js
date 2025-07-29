const Order = require('../models/Order');
const { createOrderSchema, updateOrderStatusSchema, getOrderByIdSchema, deleteOrderSchema } = require('../schemas/orderSchema');

exports.createOrder = async (req, res) => {
    const { error, value } = createOrderSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        const order_id = await Order.createOrder(value, value.items);
        return res.status(201).json({ message: 'Orden creada', order_id });
    } catch (error) {
        return res.status(500).json({ error: 'Error al crear el producto' })
    }
};

exports.getOrderById = async (req, res) => {
    const { error } = getOrderByIdSchema.validate(req.params);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        const order = await Order.getOrderById(req.params.order_id);
        if (!order) {
            return res.status(404).json({ error: 'Producto no encontrado por ID' });
        }
        return res.status(200).json(order);
    } catch (error) {
        return res.status(500).json({ error: 'Error al encontrar el producto por ID' })
    }
}

exports.getOrderByUser = async (req, res) => {
    try {
        const orders = await Order.getOrdersByUser(req.params.user_id);
        if (!orders || orders.length < 0) {
            return res.status(404).json({ error: 'Producto no encontrado por usuario' });
        }
        return res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json({ error: 'Error al encontrar el producto por usuario' })
    }
}

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.getAllOrders();
        if (!orders || orders.length === 0) {
            return res.status(404).json({ error: ' No se ha encontrado ninguna orden' });
        }
        return res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json({ error: 'Error al mostrar los productos' })
    }
}

exports.updateOrderStatus = async (req, res) => {
    const { value, error } = await updateOrderStatusSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        const updated = await Order.updateOrderStatus(req.params.order_id, value);
        if (!updated) {
            return res.status(404).json({ error: ' Orden no encontrada o no actualizada ' })
        }
        return res.status(200).json({ message: ' Status de la orden actualizado' })
    } catch (error) {
        return res.status(500).json({ error: 'Error al actualizar la orden' })
    }
}

exports.deleteOrder = async (req, res) => {
    const { error } = await deleteOrderSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        const deleted = await Order.deleteOrder(req.params.order_id);
        if (!deleted) {
            return res.status(404).json({ error: 'Orden no encontrada para eliminar' });
        }
        return res.status(200).json({ message: 'Orden eliminada con exitoso' });
    } catch (error) {
        return res.status(500).json({ error: 'Error al eliminar la orden' })
    }
}