import React, { useState } from "react";
import Layout from "../components/Layout";
import { useAuth } from "../hooks/useAuth";

const Profile = () => {
    const { user } = useAuth();

    const [formData, setFormData] = useState({
        username: user?.username || '',
        email: user?.email || '',
        role: user?.role || ''
    });

    const [isEditing, setIsEditing] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = () => {

    }

    return (
        <section className="profile-container">
            <Layout />
            <div className="profile-field">
                <h2>Mi Perfil</h2>
                <label htmlFor="name">Usuario</label>
                {isEditing ? (
                    <input
                        type="text"
                        id="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                ) : (
                    <p>{formData.username}</p>
                )}
            </div>

            <div className="profile-field">
                <label htmlFor="email">Email</label>
                {isEditing ? (
                    <input
                     type="email"
                     id="email"
                     value={formData.email}
                     onChange={handleChange}
                    />
                ) : (
                    <p>{formData.email}</p>
                )}
            </div>

            <div className="profile-field">
                <label htmlFor="rol">Rol</label>
                <p>{formData.role}</p>
            </div>

            <div className="profile-btn">
                {isEditing ? (
                    <>
                    <button>Guardar Cambios</button>
                    <button>Cancelar Cambios</button>
                    </>
                ) : (
                    <button>Editar</button>
                )}
            </div>


        </section>
    )
}

export default Profile;