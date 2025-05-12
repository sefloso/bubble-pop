import React from "react";
import { useNavigate } from "react-router-dom";


function HomePage() {
    const navigate = useNavigate();

    const startGame = () => {
        navigate('/game');
    }

    return (
        <>
        <h2>Hello!</h2>
        <button onClick={startGame}>Start Game</button>
        </>
    );
}

export default HomePage;