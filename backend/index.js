const express = require('express');
const app = express();
const cors = require('cors')
const {helmetMiddleware, morganMiddleware, limiter, notFoundHandler} = require('./middlewares/common');
const errorHandler = require('./middlewares/errorHandler');
const PORT = 3000;

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/CartRoutes')


app.use(express.json()); //para parsear a JSON las peticiones
app.use(cors()); 
app.use(helmetMiddleware);
app.use(morganMiddleware);
app.use(limiter);

app.use((req, res, next) => {
    // Permite imágenes desde cualquier origen 
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Cross-Origin-Resource-Policy', 'cross-origin'); 
    next();
});
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', userRoutes);
app.use('/api/auth', productRoutes);
app.use('/api/cart', cartRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});