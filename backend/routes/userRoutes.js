const express = require('express');
const router = express.Router();

const {
    signUp,
    login,
    editProfile,
    changePassword,
    getAllUsers,
    deleteUser
} = require('../controllers/userController'); 

const { authenticateToken } = require('../middlewares/auth');

//registro y login
router.post('/registrarse', signUp);
router.post('/iniciar-sesion', login);

//rutas protegidas
router.put('/editar-perfil/:user_id', authenticateToken, editProfile);
router.put('/cambiar-contraseña', authenticateToken, changePassword);
router.get('/usuarios', authenticateToken, getAllUsers);
router.delete('/eliminar-usuario/:user_id', authenticateToken, deleteUser);

module.exports = router;