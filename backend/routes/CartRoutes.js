const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { authenticateToken } = require('../middlewares/auth');

router.use(authenticateToken);

router.post('/añadir', cartController.addToCart);
router.get('/', cartController.getCart);
router.put('/:product_id', cartController.updateCartItem);
router.delete('/:product_id', cartController.removeFromCart);
router.delete('/:product_id', cartController.clearCart);

module.exports = router;