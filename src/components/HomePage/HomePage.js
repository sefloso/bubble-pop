import { useNavigate, Link } from "react-router-dom";
import logo from './bubbleLogo.png';
import './HomePage.css';
import Header from '../Header/Header';


function HomePage() {
    const navigate = useNavigate();
    return (
        <div className="home-container">
            <Header />
            <div className="logo">
                <img src={logo} alt="Logo" />
            </div>
            
            <nav className="home-nav">
                <ul>
                    <li><Link to='/game'>start</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default HomePage;