const Product = require('../models/Product');
const { createProductSchema, updateProductSchema, filterProductsSchema } = require('../schemas/productSchema');

exports.createProduct = async (req, res) => {
    const { error, value } = createProductSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        const product_id = await Product.createProduct(value);
        return res.status(201).json({ product_id });
    } catch (error) {
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
    try{
        const product = await Product.getProductById(req.params.product_id);
        if (!product || product.length < 0) {
            return res.status(404).json({ error: 'No se ha encontrado ningun producto con ese ID'})
        }
        return res.status(200).json(product);
    }catch(error){
        return res.status(500).json({ error: 'Error al buscar el producto'})
    }
}
