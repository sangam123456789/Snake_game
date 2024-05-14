import logo from './logo.svg';
import './App.css';
import './globals.css';

import { useEffect, useState } from "react";

export default function Home() {
  let totalGridSize = 20;

  let snakeIntialPosition = [
    {
      x: totalGridSize / 2,
      y: totalGridSize / 2,
    },
    {
      x: totalGridSize / 2,
      y: totalGridSize / 2 + 1,
    },
  ];

  // Game State
  const [score, setScore] = useState(0);
  const [food, setFood] = useState({
    x: 5,
    y: 5,
  });
  const [snake, setSnake] = useState(snakeIntialPosition);
  const [direction, setDirection] = useState("LEFT");

  function renderBoard() {
    let cellArray = [];
  
    for (let row = 0; row < totalGridSize; row++) {
      for (let col = 0; col < totalGridSize; col++) {
        let classes = "cell";
  
        let isFood = food.x === row && food.y === col;
        let isSnakeHead = snake[0].x === row && snake[0].y === col;
        let isSnake = snake.some((ele) => ele.x === row && ele.y === col);
  
        if (isFood) {
          classes = `${classes} food`;
          cellArray.push(
            <div
              key={`${row}-${col}`}
              className={classes}
              onMouseEnter={handleFoodHover}
            ></div>
          );
        } 
        if (isSnake) {
            classes = `${classes} snake`;
          }
  
          if (isSnakeHead) {
            classes = `${classes} snake-head`;
          }
  
          let cell = <div key={`${row}-${col}`} className={classes}></div>;
  
          cellArray.push(cell);
      }
    }
  
    return cellArray;
  }

  function handleFoodHover() {
    // Generate new random coordinates for the food
    let randomX = Math.floor(Math.random() * totalGridSize);
    let randomY = Math.floor(Math.random() * totalGridSize);
    setScore((sco) => sco + 10);
    // Update the food position
    setFood({
      x: randomX,
      y: randomY,
    });
  }

  function renderFood() {
    let randomX = Math.floor(Math.random() * totalGridSize);
    let randomY = Math.floor(Math.random() * totalGridSize);

    setFood({
      x: randomX,
      y: randomY,
    });
  }

  function gameOver() {
    setSnake(snakeIntialPosition);
    setScore(0);
  }

  function updateGame() {
    // Checking For Game Over
    if (
      snake[0].x < 0 ||
      snake[0].x > 20 ||
      snake[0].y < 0 ||
      snake[0].y > 20
    ) {
      gameOver();
      return;
    }

    // Checking If snake bit itself
    const isBit = snake
      .slice(1)
      .some((ele) => ele.x === snake[0].x && ele.y === snake[0].y);
    if (isBit) {
      gameOver();
      return;
    }

    let newSnake = [...snake];
    if (direction === "UP") {
      newSnake.unshift({ x: newSnake[0].x - 1, y: newSnake[0].y });
    }
    if (direction === "DOWN") {
      newSnake.unshift({ x: newSnake[0].x + 1, y: newSnake[0].y });
    }
    if (direction === "LEFT") {
      newSnake.unshift({ x: newSnake[0].x, y: newSnake[0].y - 1 });
    }
    if (direction === "RIGHT") {
      newSnake.unshift({ x: newSnake[0].x, y: newSnake[0].y + 1 });
    }

    // checking if food was eaten on not
    if (newSnake[0].x === food.x && newSnake[0].y === food.y) {
      // Ate Food
      setScore((sco) => sco + 1);
      renderFood();
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  }

  function updateDirection(e) {
    let key = e.code;

    switch (key) {
      case "ArrowUp":
        if (direction !== "DOWN") setDirection("UP");
        break;
      case "ArrowDown":
        if (direction !== "UP") setDirection("DOWN");
        break;
      case "ArrowLeft":
        if (direction !== "RIGHT") setDirection("LEFT");
        break;
      case "ArrowRight":
        if (direction !== "LEFT") setDirection("RIGHT");
        break;
    }
  }

  // Handle Events and Effects
  useEffect(() => {
    let moveSnake = setInterval(updateGame, 150);
    return () => clearInterval(moveSnake);
  });

  useEffect(() => {
    document.addEventListener("keydown", updateDirection);

    return () => document.removeEventListener("keydown", updateDirection);
  });

  return (
    <main className='main'>
      <div className='score'>
        Score : <span>{score}</span>
      </div>
      <div className='board'>{renderBoard()}</div>
    </main>
  );
}
import logo from './logo.svg';
import './App.css';
import './globals.css';

import { useEffect, useState } from "react";

export default function Home() {
  let totalGridSize = 10;

  let snakeIntialPosition = [
    {
      x: totalGridSize / 2,
      y: totalGridSize / 2,
    },
    {
      x: totalGridSize / 2,
      y: totalGridSize / 2 + 1,
    },
    {
      x: totalGridSize / 2,
      y: totalGridSize / 2 + 2,
    },
    {
      x: totalGridSize / 2,
      y: totalGridSize / 2 + 3,
    },
  ];

  // Game State
  const [score, setScore] = useState(0);
  const [food, setFood] = useState({
    x: 5,
    y: 5,
  });
  const [snake, setSnake] = useState(snakeIntialPosition);
  const [direction, setDirection] = useState("LEFT");
  const [gameStarted, setGameStarted] = useState(false);
  const [hoveredCell, setHoveredCell] = useState({ x: -1, y: -1 });

  function renderBoard() {
    let cellArray = [];
  
    for (let row = 0; row < totalGridSize; row++) {
      for (let col = 0; col < totalGridSize + 10; col++) {
        let classes = "cell";
  
        let isFood = food.x === row && food.y === col;
        let isSnakeHead = snake[0].x === row && snake[0].y === col;
        let isSnakeBody = snake.some((segment, index) => index !== 0 && segment.x === row && segment.y === col);
        let isHovered = hoveredCell.x === row && hoveredCell.y === col; // Check if the cell is currently hovered over
  
        if (isFood) {
          classes += " food";
          cellArray.push(
            <div
              key={`${row}-${col}`}
              className={classes}
              onMouseEnter={handleFoodHover} // Only bind event to food cell
            ></div>
          );
        } else if (isSnakeHead || isSnakeBody) {
          // Subtract 10 points when the mouse is hovered over a snake segment
          classes += " snake";
          if(isSnakeHead)classes += " snake-head";
          cellArray.push(
            <div
              key={`${row}-${col}`}
              className={classes}
              onMouseEnter={() => handleSnakeHover(row, col)}
            ></div>
          );
        } else {
          // Apply hover effect class when hovered
          if (isHovered) {
            classes += " hovere";
          }
          cellArray.push(
            <div
              key={`${row}-${col}`}
              className={classes}
              onMouseEnter={() => setHoveredCell({ x: row, y: col })} // Track mouse enter
              onMouseLeave={() => setHoveredCell({ x: -1, y: -1 })} // Track mouse leave
            ></div>
          );
        }
      }
    }
  
    return cellArray;
  }
  
  function handleFoodHover() {
    if(!gameStarted)return;
    // Generate new random coordinates for the food
    let randomX = Math.floor(Math.random() * totalGridSize);
    let randomY = Math.floor(Math.random() * totalGridSize);
    setScore((sco) => sco + 10);
    // Update the food position
    setFood({
      x: randomX,
      y: randomY,
    });
  }

  function handleSnakeHover(x, y) {
    // Subtract 10 points when the mouse is hovered over a snake segment
    if(gameStarted){
      setScore((sco) => sco - 10);
    }
  }

  function updateDirection() {
    let new_dir = Math.floor(Math.random() * 4);
    
    if (direction === "UP" || direction === "DOWN") {
      while (new_dir === 0 || new_dir === 2) {
        new_dir = Math.floor(Math.random() * 4);
      }
    }
  
    if (direction === "LEFT" || direction === "RIGHT") {
      while (new_dir === 1 || new_dir === 3) {
        new_dir = Math.floor(Math.random() * 4);
      }
    }
   
    if (new_dir === 0) setDirection("UP");
    if (new_dir === 1) setDirection("LEFT");
    if (new_dir === 2) setDirection("DOWN");
    if (new_dir === 3) setDirection("RIGHT");
  }
 
  function startGame() {
    if(gameStarted === false){
      setGameStarted(true);
    }
    else{
      setGameStarted(false);
    }
  }
  
  function gameOver() {
    // Reset the game state
    setSnake(snakeIntialPosition);
    setScore(0);
    setGameStarted(false);
    // Show game over alert
    alert("Game Over!");
  }

  useEffect(() => {
    // Check if the score is -10 or less
    if (score <= -10 && gameStarted) {
      gameOver(); // Trigger game over function
    }
  }, [score]);
  
  useEffect(() => {
    if (
      snake[0].x <= 0 && direction === "UP" ||
      snake[0].x >= 9 && direction === "DOWN" ||
      snake[0].y <= 0 && direction === "LEFT" ||
      snake[0].y >= 19 && direction === "RIGHT" 
    ) {
      updateDirection();
    }
  }, [snake, direction]); // Add snake and direction as dependencies
  
  function updateGame() {

   // if((snake[0].x * snake[0].y) % 7 === 0){updateDirection();console.log(direction);}


    let newSnake = [...snake];
    if (direction === "UP") {
      newSnake.unshift({ x: newSnake[0].x - 1, y: newSnake[0].y });
    }
    if (direction === "DOWN") {
      newSnake.unshift({ x: newSnake[0].x + 1, y: newSnake[0].y });
    }
    if (direction === "LEFT") {
      newSnake.unshift({ x: newSnake[0].x, y: newSnake[0].y - 1 });
    }
    if (direction === "RIGHT") {
      newSnake.unshift({ x: newSnake[0].x, y: newSnake[0].y + 1 });
    }
    newSnake.pop()
    setSnake(newSnake);
  }

  // Handle Events and Effects
  useEffect(() => {
    let moveSnake;
    if (gameStarted) {
      moveSnake = setInterval(updateGame, 150);
    }
    return () => clearInterval(moveSnake);
  });

  return (
    <main className='main'>
      <div>
        <button onClick={startGame} className='butn'>Start/Pause Game</button>
      </div>
      <div className='score'>
        Score : <span>{score}</span>
      </div>
      <div className='board'>{renderBoard()}</div>
    </main>
  );
}

