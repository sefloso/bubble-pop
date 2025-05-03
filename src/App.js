import './App.css';
import {useState, useEffect} from 'react';


function Bubble() {
  const [isPopped, setIsPopped] = useState(false);

  function handleClick() {
    setIsPopped(true);
  };

  useEffect(() => {
    let timer;

    if (isPopped) {
      timer = setTimeout(() => {
        setIsPopped(false);
      }, 2000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [isPopped])

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
