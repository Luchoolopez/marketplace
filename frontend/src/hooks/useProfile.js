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
    const [editingField, setEditingField] = useState(null);

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

            setProfileData({
                email: apiData.email || '',
                role: apiData.role || '',
                full_name: apiData.full_name || 'No especificado',
                address: apiData.address || 'No especificado',
                phone: apiData.phone || 'No especificado',
                avatar_url: apiData.avatar_url || ''
            });
        } catch (error) {
            setError(error.response?.data?.error || 'Error al cargar el perfil');
            console.error('Error en fetchProfile:', error);
        } finally {
            setLoading(false);
        }
    };

    // Actualizar el perfil
    const updateField = async (fieldName, value) => {
        try {
            setLoading(true);
            await axios.put(
                `http://localhost:3000/api/auth/editar-perfil/${userId}`,
                {[fieldName]: value}, //envia solo el campo que se esta editando
                {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }
        );

        setProfileData(prev => ({
            ...prev,
            [fieldName]: value
        }));

        setEditingField(null);

        } catch (error) {
            setError(`Error al actualizar ${fieldName}: ${error?.response?.data?.error || 'Error desconocido'}`);
            await fetchProfile();
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

    const startEditing = (fieldName) =>{
        setEditingField(fieldName);
        setError(null); //limpia errores anteriores al iniciar edicion
    }

    const cancelEditing = () => {
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
        editingField,
        startEditing,
        updateField,
        handleChange,
        cancelEditing
    };
};