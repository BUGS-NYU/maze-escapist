const mapSize = 300;

let laserImg;

// character x, y coordinates on map grid
let character = [2, 2];

// width & height of each block on map (in pixels)
const blockSize = mapSize / 5;

// indicates current game state, could be "play", "win", "lose"
let gameState = "play";

// whether all lasers are on/off
let lasersOn = true;

// create a map 2d grid
const map = [
  [0, 0, 0, 2, 1],
  [0, 0, 0, 0, 1],
  [0, 0, 0, 0, 1],
  [0, 0, 1, 0, 0],
  [0, 1, 1, 1, 2],
];

function preload() {
  // load imgs here
  laserImg = loadImage("images/laser.png");
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
  }
}

// render map and character
function render() {
  noFill();
  stroke(0);
  strokeWeight(1);

  // draw map using our 2-dimensional grid. each item in the grid represents one block on map
  for (let y = 0; y < 5; y++) {
    for (let x = 0; x < 5; x++) {
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
    }
  }

  // draw character, its coordinates determine where it stands on the map
  fill(0);
  noStroke();
  ellipse(
    character[0] * blockSize + blockSize / 2,
    character[1] * blockSize + blockSize / 2,
    30,
    30
  );

  // if standing in laser, death
  if (map[character[1]][character[0]] === 2 && lasersOn) {
    gameState = "lose";
  }
}

// respond to WASD input, adjusting the character's x & y coordinates, checks if input is also going to a filled block or edge of the map
function keyPressed() {
  if (key === "w" && character[1] > 0 && map[character[1]-1][character[0]] !== 1) {
    moveTo(character[0], character[1] - 1);
  }
  if (key === "a" && character[0] > 0 && map[character[1]][character[0]-1] !== 1) {
    moveTo(character[0] - 1, character[1]);
  }
  if (key === "s" && character[1] < 4 && map[character[1]+1][character[0]] !== 1) {
    moveTo(character[0], character[1] + 1);
  }
  if (key === "d" && character[0] < 4 && map[character[1]][character[0]+1] !== 1) {
    moveTo(character[0] + 1, character[1]);
  }
}

// move character to given coordinate, handles other behaviors
function moveTo(x, y) {
  // move character
  character = [x, y];
}

// flicker laser on/off every 1000 ms
setInterval(() => {
  lasersOn = !lasersOn;
}, 1000);