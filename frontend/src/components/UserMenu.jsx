import React from "react";
import { useAuth } from "../hooks/useAuth";
import "../styles/UserMenu.css";

const UserMenu = ({ onClose }) => {
    const { user, logout } = useAuth();


    return (
        <div className="user-menu-modal">
            <div className="user-menu-content">
                {user ? (
                    <>
                        <div className="user-modal-container">
                            <p>Bienvenido {user.username}</p>
                        </div>
                        <div className="user-modal-container-btn">
                            
                            <button><a href="perfil">Mi Perfil</a></button>
                            <button onClick={logout}>Cerrar Sesión</button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="user-modal-login-logout">
                        <button><a href="iniciar-sesion">Iniciar sesión</a></button>
                        <button><a href="registrarse">Registrarse</a></button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
};

export default UserMenu;