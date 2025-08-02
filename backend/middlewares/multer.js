//multer sirve para almacener imagenes
//como es un proyecto chico voy a utilizar esto para no complicarmela
//en proyectos grande podria usar Cloudinary o AWS S3

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/') //Carpeta dnd se van a guardar las imagenes
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); //nombre unico
    },
});

const Upload = multer({ storage });

module.exports = Upload; 