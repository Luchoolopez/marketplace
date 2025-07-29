const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const helmetMiddleware = helmet();
const morganMiddleware = morgan('dev');
const limiter = rateLimit({
    windowMs: 15*60*1000, //15 minutos
    max: 100 //maximo de 100 peticiones por IP
});

//middleware para rutas no encontradas
function notFoundHandler(req, res, next){
    res.status(404).json({ error: 'Error ruta no encontrada'});
}

module.exports = {
    helmetMiddleware,
    morganMiddleware,
    limiter,
    notFoundHandler
};