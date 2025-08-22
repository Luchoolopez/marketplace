const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { authenticateToken } = require('../middlewares/auth');

router.use(authenticateToken);

router.post('/add', cartController.addToCart);
router.get('/', cartController.getCart);
router.put('/:product_id', cartController.updateCartItem);
router.delete('/delete_product/:product_id', cartController.removeFromCart);
router.delete('/clear_cart/:user_id', cartController.clearCart);

module.exports = router;