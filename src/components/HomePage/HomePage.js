import { useNavigate } from "react-router-dom";
import logo from './bubbleLogo.png';
import './HomePage.css';
import Header from '../Header/Header';


function HomePage() {
    const navigate = useNavigate();

    const startGame = () => {
        navigate('/game');
    }

    return (
        <div className="home-container">
            <Header />
            <div className="logo">
                <img src={logo} alt="Logo" />
            </div>

            <div className="user-options">
                <button onClick={startGame}>Start Game</button>
                <button>Log In</button>
                <button>Stats</button>
            </div>
        </div>
    );
};

export default HomePage;