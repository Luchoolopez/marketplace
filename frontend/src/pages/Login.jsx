import React, { use, useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        setError('');

        try{
            const response = await axios.post('http://localhost:3000/api/auth/iniciar-sesion', {
                email,
                password
            });
            //guarda el usuario en el estado global o localstorage
            localStorage.setItem('user', JSON.stringify(response.data.user));

            navigate('/');
        }catch(error){
            setError(error.response?.data?.error || 'Error al iniciar sesion');
        }
    }

    return (
        <div className="login-container">
            <h2>Iniciar Sesión</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Contraseña</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Iniciar Sesión</button>
                <a href="/registrarse">Todavia no tenes una cuenta?</a>
            </form>
        </div>
    )
}

export default Login;