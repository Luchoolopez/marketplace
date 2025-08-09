const pool = require('../config/db');

class Cart {
    static async addToCart(userId, productId, quantity){
        const connection = await pool.getConnection();
        try{
            await connection.beginTransaction();
            const [exisitingItem] = await connection.query(
                'SELECT * FROM cart_items WHERE user_id = ? AND product_id = ?',
                [userId, productId]
            );

            if(exisitingItem.length > 0){
                await connection.query(
                    'UPDATE cart_items SET quantity = quantity + ? WHERE user_id = ? AND product_id = ?',
                    [quantity, userId, productId]
                );
            }else{
                await connection.query(
                    'INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)',
                    [userId, productId, quantity]
                );
            }

            await connection.commit();
        }catch(error){
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }

    static async updateCartItem(userId, productId, quantity){
        if(quantity <= 0){
            await this.removeFromCart(userId, productId);
            return;
        }

        const [result] = await pool.query(
            'UPDATE cart_items SET quantity = ? WHERE user_id = ? AND product_id = ?',
            [quantity, userId, productId]
        );
        return result.affectedRows > 0;
    }

    static async removeFromCart(userId, productId){
        const [result] = await pool.query(
            'DELETE FROM cart_items WHERE user_id = ? AND product_id = ?',
            [userId, productId]
        );
        return result.affectedRows > 0;
    }

    static async clearCart(userId){
        const [result] = await pool.query(
            'DELETE FROM cart_items WHERE user_id = ?',
            [userId]
        );
        return result.affectedRows > 0;
    }
}

module.exports = Cart;