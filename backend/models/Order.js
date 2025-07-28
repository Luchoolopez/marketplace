const pool = require('../config/db');

async function createOrder(orderData, items) {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        //insertar la orden
        const [orderResult] = await connection.query(
            'INSERT INTO orders (customer_id, total_amount, status) VALUES (?, ?, ?)',
            [orderData.customer_id, orderData.total_amount, orderData.status || 'pending']
        );
        const order_id = orderResult.insertId;

        //insertar los items de la orden
        for (const item of items) {
            await connection.query(
                'INSERT INTO order_items (order_id, product_id, quantity, unit_price) values (?, ?, ?, ?)',
                [order_id, item.product_id, item.quantity, item.unit_price]
            );
        }

        await connection.commit();
        return order_id;
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}

async function getOrderById(order_id) {
    const [orders] = await pool.query('SELECT * FROM orders WHERE order_id = ?', [order_id]);
    if(!orders.length) return null;
    const [items] = await pool.query('SELECT * FROM order_items WHERE order_id = ?', [order_id]);
    return {...orders[0], items}
}

async function getOrdersByUser(user_id) {
    const [orders] = await pool.query(
        'SELECT * FROM orders WHERE customer_id = ?', [user_id]
    );
    return orders;
}

async function getAllOrders() {
    const [orders] = await pool.query('SELECT * FROM orders');
    return orders;
}

async function updateOrderStatus(order_id, status) {
    const [result] = await pool.query(
        'UPDATE orders SET status = ? WHERE order_id = ?',
        [status, order_id]
    )
    return result.affectedRows > 0;
}

async function deleteOrder(order_id) {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        await connection.query(
            'DELETE FROM order_items WHERE order_id = ?',
            [order_id]
        );

        const [result] = await connection.query(
            'DELETE FROM orders WHERE order_id = ?',
            [order_id]
        );

        await connection.commit();
        return result.affectedRows > 0;
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}

module.exports = {
    createOrder,
    getOrderById,
    getOrdersByUser,
    getAllOrders,
    updateOrderStatus,
    deleteOrder
};