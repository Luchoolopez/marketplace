const User = require('../models/User');
const { signUpSchema, loginSchema, editProfileSchema, changePasswordSchema } = require('../schemas/userSchema');

exports.signUp = async (req, res) => {
    const { error, value } = signUpSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        const userId = await User.signUp(value);
        res.status(201).json({ userId });
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Error al registrar un usuario' });
    }
};

exports.login = async (req, res) => {
    const { error, value } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        const user = await User.login(value);
        if (!user) return res.status(401).json({ error: 'Credenciales invalidas' });
        res.json({ user });
    } catch (error) {
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const profile = await User.getProfile(req.params.user_id);

        if (!profile) {
            return res.status(404).json({
                success: false,
                error: 'Usuario no encontrado'
            });
        }

        res.status(200).json({
            success: true,
            data: profile
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: 'Error al obtener el perfil'
        });
    }
};

exports.editProfile = async (req, res) => {
    const { error, value } = editProfileSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        const updated = await User.editProfile(req.params.user_id, value);
        if (!updated) return res.status(404).json({ error: 'Usuario no encontrado' });
        res.json({ message: 'Perfil actualizado ' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el perfil' });
    }
};

exports.changePassword = async (req, res) => {
    const { error, value } = changePasswordSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const userId = req.user.id;

    try {
        const success = await User.changePassword(
            userId,
            value.currentPassword,
            value.newPassword
        );
        if (!success) throw new Error('Error al cambiar la contrasenia');
        res.json({ message: 'Contrasenia actualizada correctamente' })
    } catch (error) {
        if (error.message.includes('incorrecta')) {
            return res.status(401).json({ error: 'Contrasenia actual incorrecta' })
        }
        if (error.message.includes('no encontrado')) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(500).json({ error: 'Error al cambiar la contrasenia' });
    }
}
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener usuarios' })
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const deleted = await User.deleteUser(req.params.user_id);
        if (!deleted) return res.status(404).json({ error: 'Usuario no encontrado' })
        res.json({ message: 'Usuario eliminado' })
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
};