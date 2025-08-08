import React from "react";
import Layout from "../components/Layout";
import { useAuth } from "../hooks/useAuth";
import { useProfile } from "../hooks/useProfile";
import '../styles/Profile.css'

/*Hay que cambiar el disenio, no funciona el btn de cancelar*/

const Profile = () => {
    const { user } = useAuth();
    const {
        profileData,
        loading,
        error,
        editingField,
        startEditing,
        updateField,
        handleChange,
        cancelEditing
    } = useProfile(user?.user_id);

    if (loading) return <div>Cargando perfil...</div>;
    if (error) return <div>Error: {error}</div>;

    const combinedData = {
        username: user?.username || profileData.username,
        email: user?.email || profileData.email,
        role: user?.role || profileData.role,
        full_name: profileData.full_name,
        address: profileData.address,
        phone: profileData.phone,
        avatar_url: profileData.avatar_url
    };

    // Función para manejar el guardado de cada campo
    const handleSave = (fieldName) => {
        updateField(fieldName, profileData[fieldName]);
    };

    // Campos editables con sus configuraciones
    const editableFields = [
        { name: 'full_name', label: 'Nombre' },
        { name: 'address', label: 'Dirección' },
        { name: 'phone', label: 'Número de Teléfono' }
    ];

    return (
        <section className="profile-container">
            <Layout />
            <div className="profile-header">
                <h2>Mi Perfil</h2>
            </div>

            <div className="profile-field">
                <label>Usuario</label>
                <p>{combinedData.username}</p>
            </div>

            <div className="profile-field">
                <label>Email</label>
                <p>{combinedData.email}</p>
            </div>

            <div className="profile-field">
                <label>Rol</label>
                <p>{combinedData.role}</p>
            </div>

            {editableFields.map((field) => (
                <div className="profile-field" key={field.name}>
                    <label>{field.label}</label>
                    {editingField === field.name ? (
                        <div className="edit-mode">
                            <input
                                type="text"
                                name={field.name}
                                value={profileData[field.name]}
                                onChange={handleChange}
                            />
                            <div className="edit-actions">
                                <button onClick={() => handleSave(field.name)}>Guardar</button>
                                <button onClick={cancelEditing}>Cancelar</button>
                            </div>
                        </div>
                    ) : (
                        <div className="view-mode">
                            <p>{combinedData[field.name]}</p>
                            <button onClick={() => startEditing(field.name)}>Editar</button>
                        </div>
                    )}
                </div>
            ))}
        </section>
    );
};

export default Profile;