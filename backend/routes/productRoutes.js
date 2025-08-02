const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');
const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    updateStock,
    filterByCategory
} = require('../controllers/productController');

router.post('/crear-producto', upload.single('image'), createProduct);
router.get('/ver-productos', getAllProducts);
router.get('/ver-producto/:producto_id', getProductById);
router.put('/actualizar-producto/:producto_id', updateProduct);
router.put('/eliminar-producto/:producto_id', deleteProduct);
router.put('/actualizar-stock', updateStock);
router.get('/filtrar-productos', filterByCategory);


module.exports = router;