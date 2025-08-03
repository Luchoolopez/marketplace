import React from "react";
import { useAuth } from "../hooks/useAuth";
import "../styles/UserMenu.css";

const UserMenu = ({ onClose }) => {
    const { user, logout } = useAuth();

    return (
        <div className="user-menu-modal">
            <button className="user-menu-close-btn" onClick={onClose}>X</button>
            <div className="user-menu-content">
                {user ? (
                    <>
                        <div className="user-modal-container">
                            <p>Bienvenido {user.username}</p>
                        </div>
                        <div className="user-modal-container-btn">
                            <button onClick={logout}>Cerrar Sesión</button>
                        </div>
                    </>
                ) : (
                    <>
                        <a href="iniciar-sesion">Iniciar sesión</a>
                        <br />
                        <a href="registrarse">Registrarse</a>
                    </>
                )}
            </div>
        </div>
    )
};

export default UserMenu;