//your code here
document.addEventListener("DOMContentLoaded", function() {
  const gameContainer = document.getElementById("gameContainer");
  const scoreElement = document.getElementById("score");
  const totalPixels = 20 * 20;
  const snakeSpeed = 100; // in milliseconds
  let direction = "right";
  let score = 0;
  let snake = [61, 60, 59]; // initial positions of the snake

  // Create the game grid with pixels
  for (let i = 0; i < totalPixels; i++) {
    const pixel = document.createElement("div");
    pixel.classList.add("pixel");
    pixel.setAttribute("id", `pixel${i}`);
    gameContainer.appendChild(pixel);
  }

  // Place the food at a random position
  const food = generateFood();
  document.getElementById(`pixel${food}`).classList.add("food");

  // Start moving the snake automatically
  const intervalId = setInterval(moveSnake, snakeSpeed);

  // Event listener for arrow key presses
  document.addEventListener("keydown", changeDirection);

  // Function to move the snake
  function moveSnake() {
    const head = snake[0];
    let newHead;

    // Calculate the new position of the head based on the current direction
    if (direction === "right") {
      newHead = head + 1;
    } else if (direction === "left") {
      newHead = head - 1;
    } else if (direction === "up") {
      newHead = head - 20;
    } else if (direction === "down") {
      newHead = head + 20;
    }

    // Check if the snake hits the wall or itself
    if (
      newHead < 0 ||
      newHead >= totalPixels ||
      (direction === "right" && newHead % 20 === 0) ||
      (direction === "left" && (newHead + 1) % 20 === 0) ||
      document.getElementById(`pixel${newHead}`).classList.contains("snakeBodyPixel")
    ) {
      clearInterval(intervalId);
      alert("Game Over!");
      return;
    }

    // Add the new head to the snake array
    snake.unshift(newHead);

    // Check if the snake eats the food
    if (newHead === food) {
      // Increase the score
      score += 10;
      scoreElement.textContent = score;

      // Remove the food
      document.getElementById(`pixel${food}`).classList.remove("food");

      // Generate new food
      food = generateFood();
      document.getElementById(`pixel${food}`).
