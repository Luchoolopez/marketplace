const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { authenticateToken } = require('../middlewares/auth');

router.use(authenticateToken);

router.post('/add', cartController.addToCart);
router.get('/', cartController.getCart);
router.put('update_cart/:product_id', cartController.updateCartItem);
router.delete('remove_cart/:product_id', cartController.removeFromCart);
router.delete('clear_cart/:product_id', cartController.clearCart);

module.exports = router;