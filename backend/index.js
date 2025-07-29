const express = require('express');
const app = express();
const cors = require('cors')
const {helmetMiddleware, morganMiddleware, limiter, notFoundHandler} = require('./middlewares/common');
const errorHandler = require('./middlewares/errorHandler');
const PORT = 3000;

app.use(express.json()); //para parsear a JSON las peticiones
app.use(cors()); 
app.use(helmetMiddleware);
app.use(morganMiddleware);
app.use(limiter);

app.get('/', (req, res) => {
    res.send('Hola mundo');
});

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});