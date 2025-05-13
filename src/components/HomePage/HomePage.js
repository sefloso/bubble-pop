import { useNavigate } from "react-router-dom";
import logo from './bubbleLogo.png';
import './HomePage.css';


function HomePage() {
    const navigate = useNavigate();

    const startGame = () => {
        navigate('/game');
    }

    return (
        <>
        <div className="logo">
            <img src={logo} alt="Logo" />
        </div>
        <div className="user-options">
            <button onClick={startGame}>Start Game</button>
        </div>
        </>
    );
};

export default HomePage;