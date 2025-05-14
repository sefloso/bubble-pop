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
            <nav>
                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/game'>Play</Link></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
