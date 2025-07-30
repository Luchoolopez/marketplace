import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const loginUser = async(credentials) => {
    const res = await axios.post(`${API_URL}/auth/iniciar-sesion`, credentials);
    return res.data;
};

export const registerUser = async(credentials) => {
    const res = await axios.post(`${API_URL}/auth/registrarse`, credentials);
    return res.data;
};

export const getAllProducts = async(credentials) => {
    const res = await axios.get(`${API_URL}/auth/ver-productos`, credentials);
    return res.data;
};

export const getProductById = async(credentials) => {
    const res = await axios.get(`${API_URL}/auth/ver-producto/:producto_id`);
    return res.data;
};