import React, { use, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:3000/api/auth/iniciar-sesion', {
                email,
                password
            });
            //guarda el usuario en el estado global o localstorage
            console.log(response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            navigate('/');
        } catch (error) {
            setError(error.response?.data?.error || 'Error al iniciar sesion');
        }
    }

    return (
        <div className="login-container">
            <h2>Iniciar Sesión</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
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
                <div className="login-container-btn">
                    <button type="submit">Iniciar Sesión</button>
                    <a href="/registrarse">Todavia no tenes una cuenta?</a>
                </div>
            </form>
        </div>
    )
}

export default Login;