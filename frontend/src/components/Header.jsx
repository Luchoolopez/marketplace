import React from "react";
import { useNavigate } from "react-router-dom";
import { IoSearchCircle } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import '../styles/Header.css'

const Header = () => {
    return(
        <div className="header-container">
            <div className="header-container-img">
                <img></img>
            </div>
            <div className="header-container-links">
                <a>Inicio</a>
                <a>Productos</a>
                <a>Contacto</a>
            </div>
            <div className="header-container-btn">
                <a><IoSearchCircle/></a>
                <a><FaUserCircle/></a>
                <a><FaCartShopping/></a>
            </div>
        </div>
    );
}

export default Header