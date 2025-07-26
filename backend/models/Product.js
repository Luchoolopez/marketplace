const pool = require('../config/db');

async function createProduct(product){
    const { seller_id, category_id, name, description, price, stock, image_url } = product;
    const [result] = await pool.query(
        'INSERT INTO products (seller_id, category_id, name, description, price, stock, image_url) VALUES (?, ?, ?, ?, ?, ?, ?),'
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
        'UPDATE products SET name = ?, description = ?, price = ?, stock = ?, image_url = ?, category_id = ?', 
        [name, description, price, stock, image_url, category_id]
    );
    return result.affectedRows > 0;
}

async function deleteProduct(product_id){

}

async function updateStock(){

}

async function filterByCategory(){

}