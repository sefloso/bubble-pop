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
  // can edit 3000 to change time-out time. maybe can have set time + a random range, i.e. 3000 + (Math.random() * 5000)
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
      bubbleId : Date.now(),
      x : Math.random() * (containerDimensions.containerWidth - bubbleSize),
      y : Math.random() * (containerDimensions.containerHeight - bubbleSize),
      isPopped : false,
      timedOut : false,
      createdAt : Date.now()
    };

    setBubbles(prevBubbles => [...prevBubbles, newBubble]);
  }

  function removeBubble(id) {
    setBubbles(prevBubbles => prevBubbles.filter(bubble => bubble.id !== id));
  }

  function updateBubble(id, updates) {
    setBubbles(prevBubbles => prevBubbles.map(bubble => bubble.id === id ? {...bubble, ...updates} : bubble));
  }

  return(
    <>  
    <div className='game-area'>
      <h1>{score}</h1>
      <div>
      <Bubble onPop={incrementScore}/>
      <Bubble onPop={incrementScore}/>
      <Bubble onPop={incrementScore}/>
      </div>
    </div>
    </>
  )
}

export default Game;
