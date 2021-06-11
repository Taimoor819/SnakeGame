// Game Constants & Variables
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio("music/food.mp3");
const gameOverSound = new Audio("music/gameover.mp3");
const moveSound = new Audio("music/move.mp3");
const musicSound = new Audio("music/music.mp3");
let speed = 15; //after every 0.5 (1/2s) the screen will be painted
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];

food = { x: 6, y: 7 }; //food isnt a array its a particle

//Now here are the fuctions using game loop
// Game Functions
function main(ctime) {
  window.requestAnimationFrame(main);
  // console.log(ctime)
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) { //   console.log(ctime); ctime is current time and its the game loop which will continue continuously
    return;
  }
  lastPaintTime = ctime; //the last time your screen was painted its is miliseconds so /1000
  gameEngine(); //gameEngine will run the game
}

function isCollide(snake) {
  // If you bump into yourself
  for (let i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  // If you bump into the wall
  if (
    snake[0].x >= 18 ||
    snake[0].x <= 0 ||
    snake[0].y >= 18 ||
    snake[0].y <= 0
  ) {
    return true;
  }

  return false;
}

function gameEngine() {
   //part 1 updating the snake array and then food
  //part 2 render/display the snake and food
  // Part 1: Updating the snake array & Food
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    musicSound.pause();
    inputDir = { x: 0, y: 0 };
    alert("Game Over. Press any key to play again!");
    snakeArr = [{ x: 13, y: 15 }]; //if somone presses any key the snakeArr will be reset.
    musicSound.play();
    score = 0;
  }

  // If you have eaten the food, increment the score and regenerate the food
  
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    score += 1;
    if (score > hiscoreval) {
      hiscoreval = score;
      localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
      hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
      localStorage.clear(hiscoreval);
    }
    scoreBox.innerHTML = "Score: " + score;
    snakeArr.unshift({                      //unshift add  element at begining
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    let a = 2;  //our grid consist of 18 rows so its random to start from a=2and b=16
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),  //food is regenertaed at random places using math.random
    };
  }

  // Moving the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };  //make new object by destructuring so that particular index of snake doesnot overlap
  }

  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  // Part 2: Display the snake and Food
  // Display the snake
  board.innerHTML = "";         //make the board whole empty
  snakeArr.forEach((e, index) => {              //loop will iterate each time when snake eat food along y axis
    snakeElement = document.createElement("div"); //made  new element(div)  which is a snake
    snakeElement.style.gridRowStart = e.y; //styling inside js to display the snake
    snakeElement.style.gridColumnStart = e.x; //x demonstrates the coloumns,whereas y =rows

    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);   //element will be added to the board
    //the snake is  made and displayed .Now making and displaying the food
  });
  // Display the food
  foodElement = document.createElement("div"); //made  new element which is food
  foodElement.style.gridRowStart = food.y; 
  foodElement.style.gridColumnStart = food.x; //x demonstrates the coloumns,whereas y =rows
  foodElement.classList.add("food");  //made a food class to style that particular element
  board.appendChild(foodElement);
}

// Main logic starts here
musicSound.play();
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
  hiscoreval = 0;
  localStorage.setItem("hiscore", JSON.stringify(hiscoreval));  //you cant set direct 0 but convert the obj to string
} else {
  hiscoreval = JSON.parse(hiscore);
  hiscoreBox.innerHTML = "HiScore: " + hiscore;
  localStorage.clear(hiscore);
}

window.requestAnimationFrame(main);  /*When you are rendring animations ,Always use request animation frame,not setinterval  */
window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 }; // Start the game //anybutton is pressed it will move -1 towards y axis
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      inputDir.x = 0;  //its a velocity of snake
      inputDir.y = -1;   //when up arrow is trigerd there wil be an increase in y axis and x remains the same
      break;

    case "ArrowDown":
      console.log("ArrowDown");
      inputDir.x = 0; //when down key is pressed x remains the same but there will be an increase in y axis downwards so y=1
      inputDir.y = 1;
      break;

    case "ArrowLeft":
      console.log("ArrowLeft");
      inputDir.x = -1; // when left ket is pressed there will be a decrease in x axis so x=-1,y remains the same
      inputDir.y = 0;
      break;

    case "ArrowRight":
      console.log("ArrowRight");
      inputDir.x = 1; //when right key is pressed there will be an increase in x axis so x=1 and y remains the same
      inputDir.y = 0;
      break;
    default:
      break;
  }
});
