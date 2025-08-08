import React from "react";
import Layout from "../components/Layout";
import { useAuth } from "../hooks/useAuth";
import { useProfile } from "../hooks/useProfile";

const Profile = () => {
    const { user } = useAuth();
    console.log("User desde useAuth:", user);
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

    const combinedData = {
        username: user?.username || profileData.username,
        email: user?.email || profileData.email,
        role: user?.role || profileData.role,
        full_name: profileData.full_name,
        address: profileData.address,
        phone: profileData.phone,
        avatar_url: profileData.avatar_url
    };

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
                        value={combinedData.full_name}
                        onChange={handleChange}
                    />
                ) : (
                    <p>{combinedData.full_name || 'No especificado'}</p>
                )}
            </div>

            <div className="profile-field">
                <label>Usuario</label>
                {isEditing ? (
                    <input
                        type="text"
                        name="username"
                        value={combinedData.username}
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
                        value={combinedData.email}
                        onChange={handleChange}
                    />
                ) : (
                    <p>{combinedData.email}</p>
                )}
            </div>

            <div className="profile-field">
                <label>Dirección</label>
                {isEditing ? (
                    <input
                        type="text"
                        name="address"
                        value={combinedData.address}
                        onChange={handleChange}
                    />
                ) : (
                    <p>{combinedData.address || 'No especificado'}</p>
                )}
            </div>
            
            <div className="profile-field">
                <label>Número de Teléfono</label>
                {isEditing ? (
                    <input
                        type="text"
                        name="phone"
                        value={combinedData.phone}
                        onChange={handleChange}
                    />
                ) : (
                    <p>{combinedData.phone || 'No especificado'}</p>
                )}
            </div>

            <div className="profile-field">
                <label>Rol</label>
                <p>{combinedData.role}</p>
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