import React, { useEffect, useState, useRef } from "react";
import UserMenu from "./UserMenu";
import { IoSearchCircle } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import '../styles/Header.css'

const Header = () => {
    const [showSearch, setShowSearch] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const searchRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event){
            if(searchRef.current && !searchRef.current.contains(event.target)){
                setShowSearch(false);
            }
        }
        if(showSearch){
        document.addEventListener('mousedown', handleClickOutside);
        }else{
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showSearch]);

    const handleSearchClick = () => {
        if(!showSearch){
            setShowSearch(true);
        }
    }



    return(
        <div className="header-container">
            <div className="header-container-img">
                <img src="/images/kira_store_logo_white.png" alt="kira_logo_store"></img>
            </div>

            <div className="header-container-links">
                <a href="/">Inicio</a>
                <a href="/productos">Productos</a>
                <a>Contacto</a>
            </div>

            <div className="header-container-btn">
                <a onClick={handleSearchClick}><IoSearchCircle/></a>
                <a onClick={() => setShowUserMenu(!showUserMenu)}><FaUserCircle/></a>
                <a href="/carrito"><FaCartShopping/></a>
            </div>

                {/*Barra de Busqueda*/}
                <input
                    ref={searchRef}
                    type="text"
                    className={`header-search-input${showSearch ? " visible" : ""}`}
                    placeholder="Buscar"
                    autoFocus={showSearch}
                    style={{display: showSearch ? 'flex' : 'flex'}}
                />
                {showUserMenu && <UserMenu onClose={() => setShowUserMenu(false)}/>}
        </div>
    );
}

export default Header