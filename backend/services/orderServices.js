const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

class OrderService {
  static async createOrderFromCart(userId) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      //Obtener items del carrito
      const cartItems = await Cart.getCart(userId);
      if (cartItems.length === 0) {
        throw new Error('El carrito está vacío');
      }

      //Validar stock y calcular total
      let totalAmount = 0;
      for (const item of cartItems) {
        const product = await Product.getProductById(item.product_id);
        if (product.stock < item.quantity) {
          throw new Error(`Stock insuficiente para ${product.name}`);
        }
        totalAmount += product.price * item.quantity;
      }

      //Crear la orden
      const orderData = {
        customer_id: userId,
        total_amount: totalAmount,
        status: 'pending'
      };

      const orderId = await Order.createOrder(orderData, cartItems.map(item => ({
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price: item.price
      })));

      //Vaciar carrito
      await Cart.clearCart(userId);

      await connection.commit();
      return orderId;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
}

module.exports = OrderService;