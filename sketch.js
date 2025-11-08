const mapSize = 300;

let laserImg;
let charImg;
let charDir;

// character x, y coordinates on map grid
let character;

// width & height of each block on map (in pixels)
let blockSize = mapSize / 7;

// indicates current game state, could be "play", "win", "lose"
let gameState;

// whether all lasers are on/off
let lasersOn = true;

// create a map 2d grid
  // 0 = empty space
  // 1 = wall
  // 2 = laser
  // 3 = end block
const maps = [
  [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 0],
    [0, 1, 0, 0, 0, 1, 1],
    [0, 0, 0, 1, 1, 0, 1],
    [0, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 1, 0],
    [0, 1, 0, 0, 0, 1, 3],
  ],
  [
    [0, 1, 0, 0, 0, 0, 0, 2],
    [0, 1, 0, 1, 1, 1, 1, 0],
    [0, 0, 2, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 0, 0, 1],
    [0, 1, 2, 0, 0, 1, 0, 0],
    [0, 1, 0, 1, 1, 0, 1, 2],
    [0, 1, 0, 1, 1, 0, 1, 2],
    [2, 0, 0, 0, 0, 0, 1, 3],
  ],
  [
    [0, 2, 0, 0, 0, 0, 1, 0, 0, 0],
    [2, 1, 0, 1, 1, 0, 2, 0, 1, 0],
    [0, 1, 0, 0, 1, 0, 1, 1, 0, 2],
    [0, 1, 1, 2, 0, 1, 0, 0, 1, 0],
    [0, 0, 1, 0, 1, 3, 1, 0, 0, 0],
    [1, 2, 1, 0, 1, 2, 2, 1, 1, 1],
    [0, 0, 1, 1, 2, 1, 2, 0, 0, 0],
    [0, 1, 0, 0, 0, 2, 1, 1, 1, 0],
    [0, 1, 2, 1, 1, 1, 2, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 2, 1, 1, 1],
  ]
];
let mapIndex = 0;
let map = maps[mapIndex];

function preload() {
  // load imgs here
  laserImg = loadImage("images/laser.png");
  charImg = loadImage("images/character.png");
  charDir = 0;

  character = [0, 0];
  gameState = "play";
}

function setup() {
  createCanvas(mapSize, mapSize);
}

function draw() {
  background(255);

  // if playing: render map & character
  if (gameState === "play") {
    render();
  }
  // if dead: show losing screen
  else if (gameState === "lose") {
    background(255);
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(32);
    text("You Died!", width / 2, height / 2);
    textSize(20);
    text("Press 'r' to restart", width / 2, height / 2 + 40);
  }
  // if reached end: show ending screen
  else if (gameState === "win") {
    background(255);
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(32);
    text("You Won!", width / 2, height / 2);
    textSize(20);
    text("Press 'c' to continue", width / 2, height / 2 + 40);
  }
}

// render map and character
function render() {
  noFill();
  stroke(0);
  strokeWeight(1);

  // draw map using our 2-dimensional grid. each item in the grid represents one block on map
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      // if empty space
      if (map[y][x] === 0) {
        noFill();
        rect(x * blockSize, y * blockSize, blockSize, blockSize);
      }
      // if wall
      else if (map[y][x] === 1) {
        fill(100);
        rect(x * blockSize, y * blockSize, blockSize, blockSize);
      }
      // if laser
      else if (map[y][x] === 2) {
        fill(0, 0, 255, 50);
        rect(x * blockSize, y * blockSize, blockSize, blockSize);
        if (lasersOn) {
          image(laserImg, x * blockSize, y * blockSize, blockSize, blockSize);
        }
      }
      // if end block
      else if (map[y][x] === 3) {
        // fill(112, 43, 157);
        fill("#663399");
        rect(x * blockSize, y * blockSize, blockSize, blockSize);
      }
    }
  }

  
  // draw character rotated based on charDir:
  push();
  imageMode(CENTER);
  // translate to center of the character cell
  translate(character[0] * blockSize + blockSize / 2, character[1] * blockSize + blockSize / 2);
  // map charDir to rotation angle (radians): 0=left, 1=up, 2=right, 3=down
  let angle = 0;
  if (charDir === 0) angle = 0;            // left
  else if (charDir === 1) angle = HALF_PI; // up
  else if (charDir === 2) angle = scale(-1, 1);        // right
  else if (charDir === 3) angle = -HALF_PI;  // down
  rotate(angle);
  image(charImg, 0, 0, blockSize, blockSize);
  pop();
  imageMode(CORNER); // restore default (optional)


  // if standing in laser, death
  if (map[character[1]][character[0]] === 2 && lasersOn) {
    gameState = "lose";
  }
  // if standing in end block, win
  if (map[character[1]][character[0]] === 3) {
    gameState = "win";
  }
}

// respond to WASD and arrow key input, adjusting the character's x & y coordinates
function keyPressed() {
  // Up movement (W or UP_ARROW)
  if ((key === "w" || keyCode === UP_ARROW) && character[1] > 0) {
    moveTo(character[0], character[1] - 1);
    charDir = 1;
  }
  // Left movement (A or LEFT_ARROW)
  if ((key === "a" || keyCode === LEFT_ARROW) && character[0] > 0) {
    moveTo(character[0] - 1, character[1]);
    charDir = 0;
  }
  // Down movement (S or DOWN_ARROW)
  if ((key === "s" || keyCode === DOWN_ARROW) && character[1] < map.length - 1) {
    moveTo(character[0], character[1] + 1);
    charDir = 3;
  }
  // Right movement (D or RIGHT_ARROW)
  if ((key === "d" || keyCode === RIGHT_ARROW) && character[0] < map[0].length - 1) {
    moveTo(character[0] + 1, character[1]);
    charDir = 2;
  }

  // reset
  if (key === "r") {
    preload()
  }
  // continue to next level
  if (key === "c" && gameState === "win") {
    changeLevel(mapIndex + 1);
  }
}

// move character to given coordinate, handles other behaviors
function moveTo(x, y) {
  // if wall, do not move
  if (map[y][x] === 1) {
    return;
  }

  // move character
  character = [x, y];
}

// flicker laser on/off every 1000 ms
setInterval(() => {
  lasersOn = !lasersOn;
}, 1000);

// change level to given index
function changeLevel(levelIndex) {
  // if map does not exist, return
  if (levelIndex < 0 || levelIndex >= maps.length) {
    console.log("Error: level does not exist");
    return;
  }

  // update mapIndex, map, blockSize
  mapIndex = levelIndex;
  map = maps[mapIndex];
  blockSize = mapSize / map.length;

  // reset character position and game state
  character = [0, 0];
  gameState = "play";
}

// level selector ui: on change, set new level
window.addEventListener("DOMContentLoaded", () => {
  const levelSelector = document.getElementById("level-selector");
  levelSelector.addEventListener("change", (event) => {
    const selectedLevel = event.target.value;
    changeLevel(selectedLevel);
  });
});