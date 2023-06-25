//your code here
let snakeBody = [{row: 20, col: 1}, {row: 20, col: 2}, {row: 20, col: 3}];
let direction = 'right';
let score = 0;

function updateSnake() {
  let head = snakeBody[snakeBody.length - 1];
  let newHead = {row: head.row, col: head.col};
  if (direction === 'right') {
    newHead.col++;
  } else if (direction === 'left') {
    newHead.col--;
  } else if (direction === 'up') {
    newHead.row--;
  } else if (direction === 'down') {
    newHead.row++;
  }
  if (newHead.row < 1 || newHead.row > 40 || newHead.col < 1 || newHead.col > 40) {
    // Snake collided with the wall
    gameOver();
    return;
  }
  for (let i = 0; i < snakeBody.length; i++) {
    if (newHead.row === snakeBody[i].row && newHead.col === snakeBody[i].col) {
      // Snake collided with itself
      gameOver();
      return;
    }
  }
  snakeBody.push(newHead);
  if (newHead.row === food.row && newHead.col === food.col) {
    // Snake ate the food
    score++;
    generateFood();
  } else {
    snakeBody.shift();
  }
  updateGame();
}

setInterval(updateSnake, 100);
document.addEventListener('keydown', (event) => {
    if (event.keyCode === 37) {
        // Left arrow key pressed
        if (direction !== 'right') {
        direction = 'left';
        }
        } else if (event.keyCode === 38) {
        // Up arrow key pressed
        if (direction !== 'down') {
        direction = 'up';
        }
        } else if (event.keyCode === 39) {
        // Right arrow key pressed
        if (direction !== 'left') {
        direction = 'right';
        }
        } else if (event.keyCode === 40) {
        // Down arrow key pressed
        if (direction !== 'up') {
        direction = 'down';
        }
        }
        });
        
        let food = {row: 1, col: 1};
        
        function generateFood() {
        let foodRow = Math.floor(Math.random() * 40) + 1;
        let foodCol = Math.floor(Math.random() * 40) + 1;
        while (isOccupied(foodRow, foodCol)) {
        foodRow = Math.floor(Math.random() * 40) + 1;
        foodCol = Math.floor(Math.random() * 40) + 1;
        }
        food = {row: foodRow, col: foodCol};
        updateGame();
        }
        
        function isOccupied(row, col) {
        for (let i = 0; i < snakeBody.length; i++) {
        if (row === snakeBody[i].row && col === snakeBody[i].col) {
        return true;
        }
        }
        return false;
        }
        
        
        function updateGame() {
        let pixels = document.querySelectorAll('.pixel');
        pixels.forEach(pixel => {
        pixel.classList.remove('snakeBodyPixel');
        pixel.classList.remove('food');
        });
        snakeBody.forEach(bodyPixel => {
        let pixelId = 'pixel' + (bodyPixel.row - 1) * 40 + bodyPixel.col;
        let pixel = document.getElementById(pixelId);
        pixel.classList.add('snakeBodyPixel');
        });
        let foodPixelId = 'pixel' + (food.row - 1) * 40 + food.col;
        let foodPixel = document.getElementById(foodPixelId);
        foodPixel.classList.add('food');
        let scoreBoard = document.querySelector('.scoreBoard');
        scoreBoard.innerHTML = 'Score: ' + score;
        }
