import React from "react";

import { useState, useEffect } from "react";
import axios from 'axios';

const useProfile = (userId) => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        role: ''
    });

    //obtener datos del perfil
    const fetchProfile = async() => {
        try{
            setLoading(true);
            const response = await axios.get(`/api/auth/perfil/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            setProfile(response.data);
            setFormData({
                username: response.data.username || '',
                email: response.data.email || '',
                role: response.data.role || ''
            });
        }catch(error){
            setError(error.response?.data?.error || 'Error al cargar el perfil');
        }finally{
            setLoading(false);
        }
    };

    //actualizar el perfil
    const updateProfile = async () =>{
        try{
            setLoading(true);
            await axios.put(`/api/auth/editar-perfil/${userId}`, formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            await fetchProfile(); //refresca los datos
            setIsEditing(false);
        }catch(error){
            setError(error.response?.data?.error || 'Error al actualizar el perfil');
        }finally{
            setLoading(false);
        }
    };

    const handleChange = async(e) => {
        const { name, value} = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const cancelEdit = () => {
        setIsEditing(false);
        setFormData({
            username: profile?.username || '',
            email: profile?.email || '',
            role: profile?.role || ''
        });
    };

    useEffect(() => {
        if(userId){
            fetchProfile();
        }
    }, [userId]);

    return {
        profile,
        loading,
        error,
        formData,
        isEditing,
        setIsEditing,
        handleChange,
        updateProfile,
        cancelEdit
    };
};

export default useProfile;