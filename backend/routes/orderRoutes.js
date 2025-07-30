const express = require('express');
const router = express.Router();

const {
    createOrder,
    getOrderById,
    getOrderByUser,
    getAllOrders,
    updateOrderStatus,
    deleteOrder
} = require('../controllers/orderController');

router.put('/crear-orden', createOrder);
router.get('/ver-orden/:order_id', getOrderById);
router.get('/ver-orden/:usuario_id', getOrderByUser);
router.get('/ver-ordenes', getAllOrders)
router.post('/actualizar-orden/:order_id', updateOrderStatus);
router.delete('/eliminar-orden/:order_id', deleteOrder);

module.exports = router;