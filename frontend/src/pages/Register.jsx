import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Register.css'

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!username || !email || !password) {
            return setError('Todos los campos son obligatios!');
        }

        setLoading(true);
        try {
            const response = await axios.post('http://localhost:3000/api/auth/registrarse', {
                username,
                email,
                password
            });
            localStorage.setItem('user', JSON.stringify(response.data.user));
            navigate('/iniciar-sesion');
        } catch (error) {
            setError(error.response?.data?.error || 'Error al registrarse');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="register-container">
            <h2>Registrarse</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Nombre de Usuario"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Correo Electronico"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Contraseña"
                        required
                    />
                </div>
                <div className="register-container-btn">
                    <button type="submit">Registrarse</button>
                    <a href="/iniciar-sesion">Ya tienes una cuenta?</a>
                </div>
            </form>
        </div>


    )
}

export default Register;