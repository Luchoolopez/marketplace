import { useState, useEffect } from "react";
import axios from 'axios';

export const useProfile = (userId) => {
    const [profileData, setProfileData] = useState({
        username: '',
        email: '',
        role: '',
        full_name: '',
        address: '',
        phone: '',
        avatar_url: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    // Obtener datos del perfil
    const fetchProfile = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:3000/api/auth/perfil/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            const apiData = response.data.data;

            setProfileData(prev => ({
                ...prev,
                email: apiData.email || prev.email,
                role: apiData.role || prev.role,
                full_name: apiData.full_name || 'No especificado',
                address: apiData.address || 'No especificado',
                phone: apiData.phone || 'No especificado',
                avatar_url: apiData.avatar_url || ''
            }));
        } catch (error) {
            setError(error.response?.data?.error || 'Error al cargar el perfil');
            console.error('Error en fetchProfile:', error);
        } finally {
            setLoading(false);
        }
    };

    // Actualizar el perfil
    const updateProfile = async () => {
        try {
            setLoading(true);
            const profileUpdate = {
                full_name: profileData.full_name,
                address: profileData.address,
                phone: profileData.phone,
                avatar_url: profileData.avatar_url
            };

            await axios.put(`http://localhost:3000/api/auth/editar-perfil/${userId}`, profileUpdate, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            await fetchProfile(); // Refresca los datos
            setIsEditing(false);
        } catch (error) {
            setError(error.response?.data?.error || 'Error al actualizar el perfil');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const cancelEdit = () => {
        setIsEditing(false);
        fetchProfile(); // Restablece a los datos originales
    };

    useEffect(() => {
        if (userId) {
            fetchProfile();
        }
    }, [userId]);

    return {
        profileData,
        loading,
        error,
        isEditing,
        setIsEditing,
        handleChange,
        updateProfile,
        cancelEdit
    };
};