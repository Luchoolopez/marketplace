const pool = require('../config/db');
const bcrypt = require('bcryptjs');


//crear un usuario
async function signUp(user) {
    const { email, username, password } = user;
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
        'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
        [username, email, hashedPassword]
    );
    return result.insertId;
}

//registrar un usuario
async function login({ email, password }) {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) return null;

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) return null;

    return user; // retorna al usuario si todo es correcto
}

async function getProfile(user_id) {
    const [userRows] = await pool.query('SELECT user_id, email, role FROM users WHERE user_id = ?', [user_id]);
    if (userRows.length === 0) return null;

    const [profileRows] = await pool.query('SELECT full_name, address, phone, avatar_url FROM profiles WHERE user_id = ?', [user_id]);

    return {
        ...userRows[0],
        ...(profileRows[0] || {
            full_name: null,
            address: null,
            phone: null,
            avatar_url: null
        })
    };
}

//editar perfil de usuario
async function editProfile(user_id, { full_name, address, phone, avatar_url }) {
    const [checkRows] = await pool.query('SELECT * FROM profiles WHERE user_id = ?', [user_id]);

    let result;
    if (checkRows.length > 0) {
        [result] = await pool.query('UPDATE profiles SET full_name = ?, address = ?, phone = ?, avatar_url = ? WHERE user_id = ?', [full_name, address, phone, avatar_url, user_id]);
    } else {
        //crear nuevo perfil
        [result] = await pool.query('INSERT INTO profiles (user_id, full_name, address, phone, avatar_url) VALUES (?, ?, ?, ?, ?)', [user_id, full_name, address, phone, avatar_url]);
    }
    return result.affectedRows > 0;
}



//cambiar la contrasenia
async function changePassword(user_id, currentPassword, newPassword) {
    const [rows] = await pool.query('SELECT password_hash FROM users WHERE user_id = ?', [user_id]);
    if (rows.length < 0) throw new Error('Usuario no encontrado');
    const user = rows[0];
    const match = await bcrypt.compare(currentPassword, user.password_hash);
    if (!match) throw new Error('Contrasenia actual incorrecta');
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const [result] = await pool.query(
        'UPDATE users SET password_hash = ? WHERE user_id = ?',
        [hashedPassword, user_id]
    );
    return result.affectedRows > 0;
}

//lista de usuarios(para el admin)
async function getAllUsers() {
    const [rows] = await pool.query('SELECT user_id, username, email, role FROM users');
    return rows;
}

//eliminar usuario(para el admin)
async function deleteUser(user_id) {
    const [result] = await pool.query('DELETE FROM users WHERE user_id = ?', [user_id]);
    return result.affectedRows > 0;
}

module.exports = {
    signUp,
    login,
    getProfile,
    editProfile,
    changePassword,
    getAllUsers,
    deleteUser
};