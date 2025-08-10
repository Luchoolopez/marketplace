const Cart = require('../models/Cart');
const Product = require('../models/Product');

const cartController = {
    addToCart: async (req, res) => {
        try {
            const { product_id, quantity = 1 } = req.body;
            const user_id = req.user.id;

            // Validar datos
            if (!product_id || isNaN(quantity) || quantity <= 0) {
                return res.status(400).json({
                    success: false,
                    error: 'Datos inválidos'
                });
            }

            const product = await Product.getProductById(product_id);
            if (!product) {
                return res.status(404).json({
                    success: false,
                    error: 'Producto no encontrado'
                });
            }

            if (product.stock < quantity) {
                return res.status(400).json({
                    success: false,
                    error: 'Stock insuficiente'
                });
            }

            await Cart.addToCart(user_id, product_id, quantity);
            const cart = await Cart.getCart(user_id);

            return res.status(200).json({
                success: true,
                cart
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                error: 'Error al añadir al carrito'
            });
        }
    },

    getCart: async (req, res) => {
        try {
            const cart = await Cart.getCart(req.user.id);
            return res.status(200).json({
                success: true,
                cart
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                error: 'Error al obtener el carrito'
            });
        }
    },

    updateCartItem: async (req, res) => {
        try {
            const { product_id } = req.params;
            const { quantity } = req.body;
            const user_id = req.user.id;

            // Validar datos
            if (!product_id || isNaN(quantity) || quantity <= 0) {
                return res.status(400).json({
                    success: false,
                    error: 'Datos inválidos'
                });
            }

            const product = await Product.getProductById(product_id);
            if (!product) {
                return res.status(404).json({
                    success: false,
                    error: 'Producto no encontrado'
                });
            }

            if (product.stock < quantity) {
                return res.status(400).json({
                    success: false,
                    error: 'Stock insuficiente'
                });
            }

            await Cart.updateCartItem(user_id, product_id, quantity);
            const cart = await Cart.getCart(user_id);

            return res.status(200).json({
                success: true,
                cart
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                error: 'Error al actualizar el carrito'
            });
        }
    },

    removeFromCart: async (req, res) => {
        try {
            const { product_id } = req.params;

            if (!product_id) {
                return res.status(400).json({
                    success: false,
                    error: 'ID de producto no especificado'
                });
            }

            await Cart.removeFromCart(req.user.id, product_id);
            const cart = await Cart.getCart(req.user.id);

            return res.status(200).json({
                success: true,
                message: 'Producto eliminado exitosamente',
                cart
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                error: 'Error al eliminar el producto'
            });
        }
    },

    clearCart: async (req, res) => {
        try {
            await Cart.clearCart(req.user.id);
            return res.status(200).json({
                success: true,
                cart: []
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                error: 'Error al vaciar el carrito'
            });
        }
    }
};

module.exports = cartController;
