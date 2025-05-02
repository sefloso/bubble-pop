import './App.css';
import {useState} from 'react';


function Bubble() {
  const [isPopped, setIsPopped] = useState(false);

  function handleClick() {
    setIsPopped(true);
  };

  return <button className={isPopped ? 'popped' : 'bubble'} onClick={handleClick} disabled={isPopped}></button>
}

function Game() {

  return(
    <>  
    <div className='game-area'>
      <Bubble />
    </div>
    </>
  )
}

export default Game;
