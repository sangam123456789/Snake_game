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
        let isSnakeBody = snake.some((segment, index) => index !== 0 && segment.x === row && segment.y === col);
  
        if (isFood) {
          classes += " food";
          cellArray.push(
            <div
              key={`${row}-${col}`}
              className={classes}
              onMouseEnter={handleFoodHover} // Only bind event to food cell
            ></div>
          );
        } else {
          if (isSnakeHead) {
            classes += " snake-head";
          } else if (isSnakeBody) {
            classes += " snake";
          }
  
          cellArray.push(
            <div
              key={`${row}-${col}`}
              className={classes}
            ></div>
          );
        }
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

  // function gameOver() {
  //   setSnake(snakeIntialPosition);
  //   setScore(0);
  // }

  function updateGame() {
    // Checking For Game Over
    if (
      snake[0].x <= 0 ||
      snake[0].x >= 20 ||
      snake[0].y <= 0 ||
      snake[0].y >= 20
    ) {
      updateDirection();
      //return;
    }

    // Checking If snake bit itself
    // const isBit = snake
    //   .slice(1)
    //   .some((ele) => ele.x === snake[0].x && ele.y === snake[0].y);
    // if (isBit) {
    //   gameOver();
    //   return;
    // }

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
    // if (newSnake[0].x === food.x && newSnake[0].y === food.y) {
    //   // Ate Food
    //   setScore((sco) => sco + 1);
    //   renderFood();
    // } else {
    //   newSnake.pop();
    // }
    newSnake.pop()
    setSnake(newSnake);
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
    console.log(new_dir)

    if (new_dir === 0) setDirection("UP");
    if (new_dir === 1) setDirection("LEFT");
    if (new_dir === 2) setDirection("DOWN");
    if (new_dir === 3) setDirection("RIGHT");

    //updateGame();
  }
  
  // useEffect(() => {
  //   //console.log(direction + "   chuttad");
  //   renderBoard()
  // }, [direction]);
  

  // Handle Events and Effects
  useEffect(() => {
    let moveSnake = setInterval(updateGame, 150);
    return () => clearInterval(moveSnake);
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
