import './App.css';
import {useState, useEffect} from 'react';


function Bubble({onPop}) {
  const [isPopped, setIsPopped] = useState(false);
  const [timedOut, setTimedOut] = useState(false);

  function handleClick() {
    setIsPopped(true);
    onPop();
  };

  // tracks how long bubble has been on screen
  // can edit 3000 to change time-out time.
  useEffect(() => {
    let lifeTimer;

    if (!isPopped && !timedOut) {
      lifeTimer = setTimeout(() => {
        setTimedOut(true);
      }, 3000)
    }
  
    // clean up timer
    return () => {
      if (lifeTimer) {
        clearTimeout(lifeTimer);
      }
    }
  }, [isPopped, timedOut])

  useEffect(() => {
    let respawnTimer;
    if (isPopped || timedOut) {
      respawnTimer = setTimeout(() => {
        setIsPopped(false);
        setTimedOut(false);
        // bubble will generate in random 2 sec interval, edit 2000 to change interval (1k is 1 second)
      }, Math.floor(Math.random() * 2000) + 1);
    }

    return () => {
      if (respawnTimer) {
        clearTimeout(respawnTimer);
      }
    };
  }, [isPopped, timedOut])

  return <button className={isPopped ? 'popped' : timedOut ? 'timed-out' : 'bubble'} onClick={handleClick} disabled={isPopped || timedOut}></button>
}

function Game() {
  const [score, setScore] = useState(0);

  function incrementScore() {
    setScore(prevScore => prevScore + 1);
  }

  return(
    <>  
    <div className='game-area'>
      <h1>{score}</h1>
      <Bubble onPop={incrementScore}/>
      <Bubble onPop={incrementScore}/>
    </div>
    </>
  )
}

export default Game;
