import React from "react";
import {useState, useEffect} from 'react';
import Bubble from '../Bubble/Bubble';
import './Game.css';

function Game() {
  const spawnRate = 1000;
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

  function saveScore() {
    const playerName = prompt("Enter your name");

    if (!playerName) {
      return;
    }

    fetch('http://localhost:3001/api/scores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        player: playerName,
        score: score
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log('score saved successfully (not really again', data);
      alert('Score saved! (jk)');
    })
    .catch(err => {
      console.error('error savings score:', err);
      alert("error saving score");
    })
  }

  // bubble spawner
  useEffect(() => {
    const spawnInterval = setInterval(() => {
      if (bubbles.length < 5) {
        addBubble();
      }
    }, spawnRate)

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
      <button onClick={saveScore}>Save Score</button>
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