const pool = require('../config/db');

async function createProduct(product){
    const { seller_id, category_id, name, description, price, stock, image_url } = product;
    const [result] = await pool.query(
        'INSERT INTO products (seller_id, category_id, name, description, price, stock, image_url) VALUES (?, ?, ?, ?, ?, ?, ?)'
        [seller_id, category_id, name, description, price, stock, image_url]
    );
    return result.insertId;
}

async function getAllProducts(){
    const [rows] = await pool.query('SELECT * FROM products WHERE is_active = TRUE');
    return rows;
}

async function getProductById(product_id){
    const [rows] = await pool.query('SELECT * FROM products WHERE product_id = ?', [product_id]);
    return rows[0];
}

async function updateProduct(product_id, data){
    const {name, description, price, stock, image_url, category_id } = data;
    const [result] = await pool.query(
        'UPDATE products SET name = ?, description = ?, price = ?, stock = ?, image_url = ?, category_id = ? WHERE product_id = ?', 
        [name, description, price, stock, image_url, category_id, product_id]
    );
    return result.affectedRows > 0;
}

//desactiva el producto, no lo elimina
async function deleteProduct(product_id){
    const [result] = await pool.query(
        'UPDATE products SET is_active = FALSE WHERE product_id = ?', [product_id]
    );
    return result.affectedRows > 0;
}

async function updateStock(product_id, stock){
    const [result] = await pool.query(
        'UPDATE products SET stock = ? WHERE product_id = ?', [stock, product_id]
    );
    return result.affectedRows > 0;
}

async function filterByCategory({name, price, category_id}){
    let query = 'SELECT * FROM products WHERE is_active = TRUE';
    let params = [];

    if(category_id){
        query += ' AND category_id = ?';
        params.push(category_id);
    }
    if(name){
        query += ' AND name LIKE ?';
        params.push(`%${name}%`);
    }
    if(price){
        query += ' AND price = ?';
        params.push(price);
    }

    const [rows] = await pool.query(query, params);
    return rows;
}

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    updateStock,
    filterByCategory
}