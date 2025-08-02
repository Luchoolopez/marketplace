const Product = require('../models/Product');
const fs = require('fs');
const path = require('path');
const { createProductSchema, updateProductSchema, filterProductsSchema } = require('../schemas/productSchema');

exports.createProduct = async (req, res) => {
    if(req.file){
        req.body.image_url = req.file.path.replace('public', '');
    }

    //convierte campos numericos
    if(req.body.price) req.body.price = Number(req.body.price);
    if(req.body.stock) req.body.stock = Number(req.body.stock);
    if(req.body.seller_id) req.body.seller_id = Number(req.body.seller_id);
    if(req.body.category_id) req.body.category_id = Number(req.body.category_id);

    const { error, value } = createProductSchema.validate(req.body);
    if (error){
        //para evitar que se suba la img si llega a haber error
        if(req.file){
            fs.unlink(path.resolve(req.file.path), (err) => {
                if(err) console.error('Error borrando imagen: ', err);
            });
        }
    }

    try {
        const product_id = await Product.createProduct(value);
        return res.status(201).json({ product_id });
    } catch (error) {
        //si hay error error y se subio el archivo, lo borra
        if(req.file){
            fs.unlink(path.resolve(req.file.path), (err) => {
                if(err) console.error('Error borrando imagen: ', err);
            });
        }
        console.log(error);
        return res.status(500).json({ error: 'Error al crear el producto' })
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.getAllProducts();
        if (!products || products.length < 0) {
            return res.status(404).json({ error: 'No hay ningun producto creado' })
        }
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ error: 'Error al buscar los productos' })
    }
}

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.getProductById(req.params.product_id);
        if (!product || product.length < 0) {
            return res.status(404).json({ error: 'No se ha encontrado ningun producto con ese ID' })
        }
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ error: 'Error al buscar el producto' })
    }
}

exports.updateProduct = async (req, res) => {
    const { error, value } = await updateProductSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        const updated = await Product.updateProduct(req.params.product_id, value);
        if (!updated) {
            return res.status(404).json({ error: 'Producto no encontrado' })
        }
        return res.status(200).json({ message: 'Producto actualizado' })
    } catch (error) {
        return res.status(500).json({ error: 'Error al actualizar el producto' })
    }
}

exports.deleteProduct = async (req, res) => {
    try{
        const deleted = await Product.deleteProduct(req.params.product_id);
        if(!deleted){
            return res.status(404).json({ error: 'Producto no encontrado para eliminar'})
        }
        return res.status(200).json({ message: 'Producto desactivado' })
    }catch(error){
        return res.status(500).json({ error: 'Error al eliminar el producto'})
    }
}

exports.updateStock = async (req, res) => {
    const {stock} = req.body;
    if(typeof stock !== 'number' || stock < 0){
        return res.status(400).json({ error: 'Stock invalido'});
    }
    try{
        const updatedStock = await Product.updateStock(req.params.product_id, stock);
        if(!updatedStock){
            return res.status(404).json({ error: 'No se encontro el producto para actualizar el stock'})
        }
        return res.status(200).json(updatedStock);
    }catch(error){
        return res.status(500).json({ error: 'Error al actualizar el stock'})
    }
}

exports.filterByCategory = async (req, res) => {
    const filters = req.body;
    
    const {error, value} = filterProductsSchema.validate(filters);
    if(error) return res.status(400).json({ error: error.details[0].message});

    try{
        const products = await Product.filterByCategory(value);
        if(!products || products.length === 0) {
            return res.status(404).json({ error: 'No se encontraron productos con esos filtros'});
        }
        return res.status(200).json(products);
    }catch(error){
        return res.status(500).json({ error: 'Error al filtrar productos'});
    }
}