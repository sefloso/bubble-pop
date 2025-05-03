import './App.css';
import {useState, useEffect} from 'react';


function Bubble() {
  const [isPopped, setIsPopped] = useState(false);
  const [timedOut, setTimedOut] = useState(false);

  function handleClick() {
    setIsPopped(true);
  };

  // tracks how long bubble has been on screen
  // can edit 3000 to change time-out time.
  useEffect(() => {
    console.log("First useEffect running. isPopped:", isPopped, "timedOut:", timedOut);

    let lifeTimer;

    if (!isPopped && !timedOut) {
      console.log("Setting life timer");
      lifeTimer = setTimeout(() => {
        console.log("Timer expired! Setting timedOut to true");
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
    console.log("Second useEffect running. isPopped:", isPopped, "timedOut:", timedOut);
    let respawnTimer;
    if (isPopped || timedOut) {
      console.log("Setting respawn timer");
      respawnTimer = setTimeout(() => {
        console.log("Respawn timer expired! Resetting states");
        setIsPopped(false);
        setTimedOut(false);
        // bubble will generate in random 2 sec interval, edit 2000 to change interval (1k is 1 second)
      }, Math.floor(Math.random() * 2000) + 1);
    }

    return () => {
      if (respawnTimer) {
        console.log("Clearing respawn timer");
        clearTimeout(respawnTimer);
      }
    };
  }, [isPopped, timedOut])

  return <button className={isPopped ? 'popped' : timedOut ? 'timed-out' : 'bubble'} onClick={handleClick} disabled={isPopped || timedOut}></button>
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
