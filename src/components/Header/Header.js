import React from "react";
import './Header.css';
import { Link } from "react-router-dom";
import logo from './navbarBubble.png';

function Header() {
    return( 
        <header className="header">
            <div className="navbar-logo">
                <img src={logo} alt="Logo"></img>
            </div>
            <nav className="nav">
                <ul>
                    <li><Link to='/'>home</Link></li>
                    <li><Link to='/game'>play</Link></li>
                    <li><Link to='/stats'>stats</Link></li>
                    <li><Link to='/login'>log in</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
