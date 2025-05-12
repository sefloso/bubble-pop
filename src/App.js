import './App.css';
import {useState, useEffect} from 'react';


function Bubble({id, xPos, yPos, onPop, isPopped, onTimeout, timedOut, onRespawn}) {

  const bubbleStyle = {
    position: 'absolute',
    left: `${xPos}px`,
    top: `${yPos}px`
  };

  function handleClick() {
    onPop(id);
  };

  // tracks how long bubble has been on screen
  // can edit 3000 to change time-out time. maybe can have set time + a random range, i.e. 3000 + (Math.random() * 5000)
  useEffect(() => {
    let lifeTimer;

    if (!isPopped && !timedOut) {
      lifeTimer = setTimeout(() => {
        onTimeout(id);
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
        onRespawn(id);
        // bubble will generate in random 2 sec interval, edit 2000 to change interval (1k is 1 second)
      }, Math.floor(Math.random() * 5000) + 1);
    }

    return () => {
      if (respawnTimer) {
        clearTimeout(respawnTimer);
      }
    };
  }, [isPopped, timedOut])

  return <button className={isPopped ? 'popped' : timedOut ? 'timed-out' : 'bubble'} onClick={handleClick} disabled={isPopped} style = {bubbleStyle}></button>
}

function Game() {
  const [bubbles, setBubbles] = useState([]);
  const [score, setScore] = useState(0);
  const bubbleSize = 20;
  const [containerDimensions, setContainerDimensions] = useState({
    containerHeight : window.innerHeight,
    containerWidth : window.innerWidth
  });

  // dyanamically resize game area
  useEffect(() => {
    function updateDimensions() {
      setContainerDimensions(
        {containerHeight : window.innerHeight,
          containerWidth : window.innerWidth
        }
      );
    };

    // listen for window resize
    window.addEventListener('resize', updateDimensions);

    // cleanup
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };  
  }, [])

  function incrementScore() {
    setScore(prevScore => prevScore + 1);
  }

  // attempting to lift state up from Bubble component to Game component
  function addBubble() {
    const newBubble = {
      // placeholder identifier
      id : Date.now() + Math.random(),
      x : Math.random() * (containerDimensions.containerWidth - bubbleSize),
      y : Math.random() * (containerDimensions.containerHeight - bubbleSize),
      isPopped : false,
      timedOut : false
    };

    setBubbles(prevBubbles => [...prevBubbles, newBubble]);
  }

  function popBubble(id) {
    setBubbles(prevBubbbles => prevBubbbles.map(bubble => bubble.id === id ? {...bubble, isPopped:true} : bubble));
    incrementScore();
  }

  function timeoutBubble(id) {
    setBubbles(prevBubbles => prevBubbles.map(bubble => bubble.id === id ? {...bubble, timedOut:true} : bubble));
  }

  function respawnBubble(id) {
    setBubbles(prevBubbles => prevBubbles.filter(bubble => bubble.id !== id));

    setTimeout(() => {
      addBubble();
    }, Math.floor(Math.random() * 5000) + 1);
  }

  // bubble spawner
  useEffect(() => {
    const spawnInterval = setInterval(() => {
      if (bubbles.length < 5) {
        addBubble();
      }
    }, 2000)

    return () => {
      if (spawnInterval) {
        clearInterval(spawnInterval);
      }
    };
  }, [bubbles])

  return(
    <>  
    <div className='game-area'>
      <h1>{score}</h1>
            {bubbles.map(bubble => (
      <Bubble 
        key = {bubble.id}
        id ={bubble.id}
        xPos={bubble.x}
        yPos={bubble.y}
        onPop={() => popBubble(bubble.id)}
        isPopped={bubble.isPopped}
        onTimeout={() => timeoutBubble(bubble.id)}
        timedOut={bubble.timedOut}
        onRespawn={() => respawnBubble(bubble.id)}

      />
    ))}
      </div>
    </>
  )
}

export default Game;

// can implement DB stuff w/ users, ID, username, password, email, high-scores, etc.