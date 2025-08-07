import React from "react";
import Layout from "../components/Layout";
import { useAuth } from "../hooks/useAuth";
import { useProfile } from "../hooks/useProfile";

const Profile = () => {
    const { user } = useAuth();
    const {
        profileData,
        loading,
        error,
        isEditing,
        setIsEditing,
        handleChange,
        updateProfile,
        cancelEdit
    } = useProfile(user?.user_id);

    if (loading) return <div>Cargando perfil...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <section className="profile-container">
            <Layout />
            <div className="profile-field">
                <h2>Mi Perfil</h2>
                <label>Nombre</label>
                {isEditing ? (
                    <input
                        type="text"
                        name="full_name"
                        value={profileData.full_name}
                        onChange={handleChange}
                    />
                ) : (
                    <p>{profileData.full_name || 'No especificado'}</p>
                )}
            </div>

            <div className="profile-field">
                <label>Usuario</label>
                {isEditing ? (
                    <input
                        type="text"
                        name="username"
                        value={profileData.username}
                        onChange={handleChange}
                    />
                ) : (
                    <p>{profileData.username}</p>
                )}
            </div>

            <div className="profile-field">
                <label>Email</label>
                {isEditing ? (
                    <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleChange}
                    />
                ) : (
                    <p>{profileData.email}</p>
                )}
            </div>

            <div className="profile-field">
                <label>Dirección</label>
                {isEditing ? (
                    <input
                        type="text"
                        name="address"
                        value={profileData.address}
                        onChange={handleChange}
                    />
                ) : (
                    <p>{profileData.address || 'No especificado'}</p>
                )}
            </div>
            
            <div className="profile-field">
                <label>Número de Teléfono</label>
                {isEditing ? (
                    <input
                        type="text"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleChange}
                    />
                ) : (
                    <p>{profileData.phone || 'No especificado'}</p>
                )}
            </div>

            <div className="profile-field">
                <label>Rol</label>
                <p>{profileData.role}</p>
            </div>

            <div className="profile-actions">
                {isEditing ? (
                    <>
                        <button onClick={updateProfile}>Guardar Cambios</button>
                        <button onClick={cancelEdit}>Cancelar</button>
                    </>
                ) : (
                    <button onClick={() => setIsEditing(true)}>Editar</button>
                )}
            </div>
        </section>
    );
};

export default Profile;