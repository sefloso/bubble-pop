import {useEffect} from 'react';
import './Bubble.css';

function Bubble({id, xPos, yPos, onPop, isPopped, onTimeout, timedOut, onRespawn}) {
  // change these values to edit how long bubble lives and the range in which it will respawn
  const bubbleLife = 5000;
  const respawnRange = 2000;

  const bubbleStyle = {
    position: 'absolute',
    left: `${xPos}px`,
    top: `${yPos}px`
  };

  function handleClick() {
    onPop(id);
  };

  // tracks how long bubble has been on screen
  // can edit bubbleLife to change time-out time. maybe can have set time + a random range, i.e. 3000 + (Math.random() * 5000)
  useEffect(() => {
    let lifeTimer;

    if (!isPopped && !timedOut) {
      lifeTimer = setTimeout(() => {
        onTimeout(id);
      }, bubbleLife)
    }
  
    // clean up timer
    return () => {
      if (lifeTimer) {
        clearTimeout(lifeTimer);
      }
    }
  }, [isPopped, timedOut, id, onRespawn])

  useEffect(() => {
    let respawnTimer;
    if (isPopped || timedOut) {
      respawnTimer = setTimeout(() => {
        onRespawn(id);
        // bubble will generate in random 2 sec interval, edit 2000 to change interval (1k is 1 second)
      }, Math.floor(Math.random() * respawnRange) + 1);
    }

    return () => {
      if (respawnTimer) {
        clearTimeout(respawnTimer);
      }
    };
  }, [isPopped, timedOut, id, onTimeout])

  return <button className={isPopped ? 'popped' : timedOut ? 'timed-out' : 'bubble'} onClick={handleClick} disabled={isPopped} style = {bubbleStyle}></button>
}

export default Bubble;