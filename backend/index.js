const express = require('express');
const app = express();
const cors = require('cors')
const PORT = 3000;

app.use(express.json()); //para parsear a JSON las peticiones
app.use(cors()); 

app.get('/', (req, res) => {
    res.send('Hola mundo');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});