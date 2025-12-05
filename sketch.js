let mapSize = 600;

let laserImg;
let charImg;
let charDir;
let knightImg;
let move;
let knightSound;
let dirtImg;
let stoneImg;
let chompSound;
let cannonSound;
let cannonImg;
let roundshotImg;

// character
// x (int): position on map grid
// y (int): position on map grid
// canMove (bool): whether character can move
// visible (bool): whether character is visible
// canReset (bool): whether character can reset (R)
let character;

// width & height of each block on map (in pixels)
let blockSize = mapSize / 7;

// indicates current game state, could be "play", "win", "lose"
let gameState;

// whether all lasers are on/off
let lasersOn = true;

// array of all roundshots (cannon balls) currently visible on map
// roundshot object: { startX, startY, endX, endY, currX, currY }
let roundshots = [];

// create a map 2d grid
// ' ' = empty space
// W = wall
// L = laser
// E = end block
// K = knight
// D = dead knight
// 1 = cannon up
// 2 = cannon down
// 3 = cannon left
// 4 = cannon right
// 5 = dead cannon up
// 6 = dead cannon down
// 7 = dead cannon left
// 8 = dead cannon right
const maps = [
  [
    [" ", " ", " ", " ", " ", " ", " "],
    [" ", "W", "W", "W", "W", "W", " "],
    [" ", "W", " ", " ", " ", "W", "W"],
    [" ", " ", " ", "W", "W", " ", "W"],
    [" ", "W", "W", "W", " ", " ", " "],
    [" ", " ", " ", "W", " ", "W", " "],
    [" ", "W", " ", " ", " ", "W", "E"],
  ],
  [
    [" ", "W", " ", " ", " ", " ", " ", "L"],
    [" ", "W", " ", "W", "W", "W", "W", " "],
    [" ", " ", "L", " ", " ", " ", "W", " "],
    [" ", "W", "W", "W", "W", " ", " ", "W"],
    [" ", "W", "L", " ", " ", "W", " ", " "],
    [" ", "W", " ", "W", "W", " ", "W", "L"],
    [" ", "W", " ", "W", "W", " ", "W", "L"],
    ["L", " ", " ", " ", " ", " ", "W", "E"],
  ],
  [
    [" ", "L", " ", " ", " ", " ", "W", " ", " ", " "],
    ["L", "W", " ", "W", "W", " ", "L", " ", "W", " "],
    [" ", "W", " ", " ", "W", " ", "W", "W", " ", "L"],
    [" ", "W", "W", "L", " ", "W", " ", " ", "W", " "],
    [" ", " ", "W", " ", "W", "E", "W", " ", " ", " "],
    ["W", "L", "W", " ", "W", "L", "L", "W", "W", "W"],
    [" ", " ", "W", "W", "L", "W", "L", " ", " ", " "],
    [" ", "W", " ", " ", " ", "L", "W", "W", "W", " "],
    [" ", "W", "L", "W", "W", "W", "L", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", "L", "W", "W", "W"],
  ],
  [
    [" ", " ", " ", " ", "W", " ", " ", "W", " ", " "],
    [" ", " ", " ", "W", " ", " ", "W", " ", " ", " "],
    [" ", "W", " ", " ", " ", " ", " ", "W", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", "K", " ", " ", "W", " ", " "],
    ["W", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    ["W", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    ["W", "W", "W", " ", " ", " ", "W", "W", "W", "W"],
    [" ", " ", " ", " ", " ", "W", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", "K", " ", " ", "E"],
  ],
  [
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "L"],
    [" ", "W", "W", "W", "W", "W", "W", "W", " ", "W", " "],
    [" ", " ", " ", " ", " ", " ", "L", "L", "L", "W", " "],
    [" ", " ", " ", " ", " ", " ", "L", "L", "L", "W", " "],
    [" ", " ", "W", "K", " ", " ", "L", "L", "L", "W", " "],
    ["W", " ", "W", "W", "W", "W", "W", "W", "W", "W", " "],
    ["W", " ", " ", " ", "L", " ", " ", " ", " ", "W", " "],
    ["W", " ", "W", "W", "W", "W", "W", "W", " ", "W", " "],
    [" ", " ", " ", " ", "K", " ", " ", " ", " ", "W", " "],
    [" ", "W", "W", "W", "W", "W", "W", " ", "W", "W", " "],
    [" ", " ", " ", " ", "L", " ", " ", " ", "K", "W", "E"],
  ],
  [
    [" ", " ", " ", " ", " ", " ", "W", "W", "W", "W", "W", "W"],
    [" ", " ", " ", " ", " ", "K", " ", " ", " ", " ", " ", "W"],
    [" ", " ", " ", " ", " ", " ", " ", "K", " ", " ", " ", " "],
    ["W", "W", "W", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    ["W", "W", "W", "W", "W", " ", " ", " ", " ", " ", " ", " "],
    ["W", "W", "W", "W", "W", "W", "W", "W", "W", " ", " ", " "],
    ["K", "W", " ", " ", " ", " ", "W", "W", "W", "W", "K", " "],
    ["W", " ", " ", " ", " ", " ", "L", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", "L", "L", "L", " ", " ", " ", " "],
    [" ", " ", " ", "W", "L", "L", "K", "L", "L", " ", " ", " "],
    [" ", "W", "W", "W", " ", "L", "L", "L", " ", " ", " ", " "],
    ["E", "W", " ", " ", " ", " ", "L", " ", " ", " ", " ", " "],
  ],
  [
    [" ", " ", " ", " ", " ", "L", "L", "L", "L", "L", " ", "W"],
    ["W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "L", "W"],
    ["W", "W", "W", "W", "W", "W", "W", "W", " ", "L", "L", "W"],
    ["W", "W", "W", "W", "W", "W", "W", "W", "W", "L", "W", "W"],
    ["W", "W", "W", "W", "W", "W", "W", "W", "W", "L", " ", "L"],
    ["W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "W", "L"],
    ["L", "L", "W", "W", "W", "W", "W", "W", "W", "W", "W", "L"],
    ["L", "L", "E", "L", "L", "L", "W", "W", "W", "W", "W", "L"],
    ["L", "L", "L", "L", "L", "L", " ", "L", " ", " ", " ", " "],
    ["L", "L", "L", "L", "L", " ", "L", " ", " ", " ", " ", " "],
    ["W", "W", "L", "L", "L", "L", " ", "L", " ", " ", " ", " "],
    ["W", "W", "W", "W", "W", "L", "L", " ", "L", " ", " ", " "],
  ],
  [
    [" ", " ", " ", " ", " ", " ", "W", "L", "W", "L", " ", "L", " ", "L"],
    [" ", "W", " ", "W", "W", " ", "W", " ", "W", " ", "W", "W", "W", " "],
    [" ", "W", " ", "W", " ", " ", " ", "L", "W", "L", "W", "L", "W", "L"],
    [" ", "W", " ", "W", " ", "W", "W", " ", "W", " ", "W", " ", "W", " "],
    [" ", "W", " ", "W", " ", "W", " ", "L", " ", "L", "W", "L", "W", "L"],
    [" ", "W", " ", "W", " ", "W", " ", "W", "W", " ", "W", " ", "W", " "],
    [" ", "W", " ", "W", " ", "W", "W", "W", " ", "L", "W", "L", " ", "L"],
    ["L", "W", "L", " ", "L", " ", "L", "W", "K", " ", " ", " ", "W", " "],
    [" ", "W", "W", "W", "W", "W", "W", "W", "W", " ", "W", " ", "W", " "],
    ["L", " ", "L", " ", "L", " ", "L", " ", "W", " ", "W", "W", "W", " "],
    [" ", "W", " ", "W", "W", "W", "W", " ", "W", " ", " ", " ", " ", " "],
    ["L", "W", "L", " ", "W", " ", "W", " ", " ", " ", " ", " ", " ", " "],
    [" ", "W", "W", "W", "W", "L", "W", " ", " ", " ", " ", " ", " ", " "],
    ["L", " ", "L", " ", "L", " ", "W", " ", " ", " ", "K", "K", "K", "E"],
  ],
  [
    [" ", "W", "W", "W", "W", "W", "W", "W", "W"],
    [" ", "W", "W", "W", "W", "W", "W", "W", "W"],
    [" ", "W", "2", "W", "W", "W", "W", "W", "W"],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", "1", " ", " "],
    ["W", " ", "W", " ", "W", "W", "W", "W", " "],
    ["W", " ", " ", " ", "W", "W", "W", "W", " "],
    ["W", "W", "W", "W", "W", "W", "W", "W", "E"],
  ],
  [
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "2"],
    [" ", "K", "W", "2", " ", " ", " ", " ", " ", " ", "K", "3", " "],
    [" ", "W", "W", " ", "W", "W", "W", "W", "W", "W", "W", "W", " "],
    [" ", " ", " ", " ", " ", "K", "W", "W", "W", "W", "2", "2", " "],
    [" ", "W", "W", "W", "4", " ", " ", "2", " ", "W", " ", " ", "W"],
    ["K", "W", "3", "W", " ", " ", " ", " ", "3", "W", " ", " ", " "],
    [" ", " ", "3", "W", "4", " ", "E", " ", "3", "W", " ", "K", " "],
    [" ", "W", "4", "W", "4", " ", " ", " ", "3", "W", "1", "1", " "],
    [" ", "W", "4", " ", " ", " ", " ", " ", "1", "W", "W", "W", " "],
    ["1", "W", "W", "W", "1", "W", "W", "W", "W", "W", " ", " ", " "],
    [" ", " ", " ", " ", " ", "4", " ", "W", " ", " ", " ", "W", "W"],
    [" ", "L", "L", "L", " ", " ", " ", " ", " ", "W", " ", " ", "3"],
    [" ", " ", " ", " ", " ", "4", " ", " ", " ", " ", " ", " ", "3"],
  ],
  [
    [" ", " ", " ", " ", " ", " ", " ", " ", "2", "4", " ", "4", "1"],
    [" ", "4", " ", " ", " ", "3", "4", "3", " ", "1", "1", "4", "1"],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", "4", "2", "4", "1"],
    [" ", "4", " ", "2", " ", " ", "2", " ", " ", "E", "1", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", "4", " ", "3", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "4", " ", " "],
    [" ", "1", " ", "3", "2", " ", " ", " ", " ", "4", " ", " ", "1"],
    [" ", " ", " ", " ", "1", " ", " ", " ", " ", " ", "2", "3", " "],
    [" ", "4", " ", " ", " ", "1", " ", " ", " ", " ", "4", "1", " "],
    [" ", "1", " ", " ", " ", "3", " ", " ", "1", " ", " ", " ", "3"],
    [" ", " ", " ", " ", " ", " ", "1", " ", " ", " ", " ", " ", " "],
    [" ", "4", " ", " ", " ", " ", " ", " ", "3", "2", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", "4", " ", " ", "1"],
  ],
  [
    [" ", "L", " ", " ", "K", " ", " ", "L", " ", " ", "L", "2"],
    ["L", "L", "L", "L", "L", "L", "K", "L", "L", "L", "L", "L"],
    [" ", "L", " ", " ", "L", " ", " ", "L", " ", " ", "L", " "],
    [" ", "L", " ", " ", "L", " ", " ", "L", "K", " ", "L", " "],
    ["L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L"],
    ["K", "L", " ", " ", "L", " ", " ", "L", " ", " ", "K", " "],
    [" ", "L", "K", " ", "L", " ", " ", "L", " ", " ", "L", " "],
    ["L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L"],
    [" ", "L", " ", " ", "K", " ", " ", "L", " ", " ", "L", " "],
    [" ", "L", " ", " ", "L", " ", " ", "L", " ", " ", "L", " "],
    ["L", "L", "L", "L", "K", "L", "L", "L", "L", "L", "L", "L"],
    ["4", "L", " ", " ", "L", " ", " ", "L", " ", " ", "L", "E"],
  ],
  [
    [
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
    ],
    [
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
    ],
    [
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
    ],
    [
      " ",
      "W",
      " ",
      "W",
      " ",
      "W",
      " ",
      "W",
      "K",
      " ",
      " ",
      "K",
      "W",
      " ",
      "W",
      " ",
      "W",
      " ",
      "W",
      " ",
    ],
    [
      " ",
      "W",
      "W",
      "W",
      "W",
      "W",
      "W",
      "W",
      "W",
      " ",
      " ",
      "W",
      "W",
      "W",
      "W",
      "W",
      "W",
      "W",
      "W",
      " ",
    ],
    [
      " ",
      " ",
      "W",
      "2",
      "2",
      "4",
      "4",
      "3",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      "2",
      "2",
      "2",
      "W",
      " ",
      " ",
    ],
    [
      " ",
      " ",
      "W",
      "4",
      "2",
      "1",
      "1",
      "3",
      "1",
      "4",
      "2",
      "2",
      " ",
      " ",
      " ",
      "2",
      "2",
      "W",
      " ",
      " ",
    ],
    [
      " ",
      " ",
      "W",
      "3",
      " ",
      "4",
      " ",
      "3",
      "3",
      "1",
      "3",
      " ",
      " ",
      " ",
      " ",
      " ",
      "2",
      "W",
      " ",
      " ",
    ],
    [
      " ",
      " ",
      "W",
      "2",
      "1",
      "1",
      "2",
      "3",
      "4",
      "2",
      " ",
      "2",
      " ",
      "K",
      " ",
      "3",
      " ",
      "W",
      " ",
      " ",
    ],
    [
      " ",
      " ",
      "W",
      "L",
      "W",
      "W",
      "W",
      "W",
      "L",
      " ",
      " ",
      "L",
      "W",
      "W",
      "W",
      "W",
      "2",
      "W",
      " ",
      " ",
    ],
    [
      " ",
      " ",
      "W",
      "L",
      " ",
      "L",
      "L",
      " ",
      "L",
      "1",
      " ",
      "L",
      " ",
      "L",
      "W",
      "L",
      "L",
      "W",
      " ",
      " ",
    ],
    [
      " ",
      " ",
      "W",
      "L",
      "L",
      "W",
      "W",
      "W",
      "W",
      "4",
      "3",
      "W",
      "L",
      "L",
      " ",
      "L",
      "L",
      "W",
      " ",
      " ",
    ],
    [
      " ",
      " ",
      "W",
      " ",
      "L",
      "W",
      " ",
      "L",
      " ",
      "L",
      " ",
      "L",
      "L",
      "L",
      "L",
      "L",
      " ",
      "W",
      " ",
      " ",
    ],
    [
      " ",
      " ",
      "W",
      "L",
      "L",
      " ",
      "L",
      "W",
      "L",
      "L",
      "L",
      "K",
      " ",
      "L",
      "L",
      "L",
      "L",
      "W",
      " ",
      " ",
    ],
    [
      "W",
      "W",
      "W",
      "L",
      "W",
      "W",
      "W",
      "W",
      "W",
      "W",
      "W",
      "1",
      "W",
      "W",
      "W",
      "W",
      "1",
      "W",
      "W",
      "W",
    ],
    [
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      "W",
      " ",
      " ",
      "3",
      " ",
      " ",
      "L",
      " ",
      " ",
      " ",
      "W",
    ],
    [
      " ",
      "W",
      "W",
      "L",
      "W",
      " ",
      "W",
      "W",
      " ",
      "L",
      " ",
      "W",
      " ",
      "W",
      " ",
      "W",
      " ",
      "W",
      " ",
      "W",
    ],
    [
      " ",
      "W",
      "E",
      " ",
      "W",
      " ",
      "W",
      "E",
      "1",
      "W",
      " ",
      "W",
      " ",
      "L",
      " ",
      "W",
      " ",
      "W",
      "E",
      "W",
    ],
    [
      " ",
      "W",
      "K",
      " ",
      "W",
      " ",
      "W",
      "W",
      "W",
      "W",
      " ",
      "W",
      " ",
      "W",
      "W",
      "W",
      " ",
      "W",
      "W",
      "W",
    ],
    [
      " ",
      " ",
      " ",
      " ",
      "W",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      " ",
      "K",
      "3",
    ],
  ],
  [
    [" ", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L"],
    ["L", "L", "L", "L", " ", "K", "L", " ", "L", "L", "L", "L"],
    ["L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", " "],
    ["L", "L", "L", "L", "K", "L", "L", "L", "L", "L", "L", "L"],
    ["L", " ", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L"],
    ["L", "W", "W", "L", " ", "L", "L", "L", "L", "L", "L", "L"],
    ["L", "L", "W", "W", "W", "W", "W", "L", "L", "L", "L", "L"],
    ["L", " ", " ", " ", " ", " ", "W", "W", "W", "L", "L", "E"],
    [" ", " ", " ", " ", " ", " ", " ", " ", "W", "W", "W", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", "W", "1", " "],
  ],
];
let mapIndex = 0;
let map = maps[mapIndex];

function preload() {
  // load imgs here
  laserImg = loadImage("images/laser.png");
  charImg = loadImage("images/character.png");
  knightImg = loadImage("images/knight.png");
  charDir = 0;
  dirtImg = loadImage("images/dirt.jpg");
  stoneImg = loadImage("images/stone.png");
  cannonImg = loadImage("images/cannon.webp");
  roundshotImg = loadImage("images/roundshot.png");

  // load sounds here
  move = loadSound("sounds/move.mp3");
  knightSound = loadSound("sounds/knight-sound.mp3");
  chompSound = loadSound("sounds/chomp.mp3");
  cannonSound = loadSound("sounds/cannon.mp3");
  deathSound = loadSound("sounds/villager.mp3");

  // needed to prevent audio-related performance issues
  move.playMode("restart");
  knightSound.playMode("restart");
  chompSound.playMode("restart");
  cannonSound.playMode("restart");
  deathSound.playMode("restart");

  character = {
    x: 0,
    y: 0,
    canMove: true,
    visible: true,
    canReset: true,
  };
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
      if (map[y][x] === " ") {
        noFill();
        rect(x * blockSize, y * blockSize, blockSize, blockSize);
        image(dirtImg, x * blockSize, y * blockSize, blockSize, blockSize);
      }
      // if wall
      else if (map[y][x] === "W") {
        noFill();
        rect(x * blockSize, y * blockSize, blockSize, blockSize);
        image(stoneImg, x * blockSize, y * blockSize, blockSize, blockSize);
      }
      // if laser
      else if (map[y][x] === "L") {
        push();
        noFill();
        rect(x * blockSize, y * blockSize, blockSize, blockSize);
        tint(100, 100, 255, 200);
        image(dirtImg, x * blockSize, y * blockSize, blockSize, blockSize);
        if (lasersOn) {
          noTint();
          image(laserImg, x * blockSize, y * blockSize, blockSize, blockSize);
        }
        pop();
      }
      // if end block
      else if (map[y][x] === "E") {
        fill("#663399");
        rect(x * blockSize, y * blockSize, blockSize, blockSize);
      }
      // if knight block
      else if (map[y][x] === "K") {
        noFill();
        rect(x * blockSize, y * blockSize, blockSize, blockSize);
        image(dirtImg, x * blockSize, y * blockSize, blockSize, blockSize);
        image(knightImg, x * blockSize, y * blockSize, blockSize, blockSize);
      }
      // if dead knight
      else if (map[y][x] === "D") {
        noFill();
        rect(x * blockSize, y * blockSize, blockSize, blockSize);
        image(dirtImg, x * blockSize, y * blockSize, blockSize, blockSize);
      }
      // if cannon up
      else if (map[y][x] === "1") {
        noFill();
        rect(x * blockSize, y * blockSize, blockSize, blockSize);
        image(dirtImg, x * blockSize, y * blockSize, blockSize, blockSize);
        push();
        imageMode(CENTER);
        translate(x * blockSize + blockSize / 2, y * blockSize + blockSize / 2);
        rotate(PI + PI / 4);
        image(cannonImg, 0, 0, blockSize * 1.5, blockSize * 1.5);
        pop();
      }
      // if cannon down
      else if (map[y][x] === "2") {
        noFill();
        rect(x * blockSize, y * blockSize, blockSize, blockSize);
        image(dirtImg, x * blockSize, y * blockSize, blockSize, blockSize);
        push();
        imageMode(CENTER);
        translate(x * blockSize + blockSize / 2, y * blockSize + blockSize / 2);
        rotate(PI / 4);
        image(cannonImg, 0, 0, blockSize * 1.5, blockSize * 1.5);
        pop();
      }
      // if cannon right
      else if (map[y][x] === "3") {
        noFill();
        rect(x * blockSize, y * blockSize, blockSize, blockSize);
        image(dirtImg, x * blockSize, y * blockSize, blockSize, blockSize);
        push();
        imageMode(CENTER);
        translate(x * blockSize + blockSize / 2, y * blockSize + blockSize / 2);
        rotate(PI / 2 + PI / 4);
        image(cannonImg, 0, 0, blockSize * 1.5, blockSize * 1.5);
        pop();
      }
      // if cannon left
      else if (map[y][x] === "4") {
        noFill();
        rect(x * blockSize, y * blockSize, blockSize, blockSize);
        image(dirtImg, x * blockSize, y * blockSize, blockSize, blockSize);
        push();
        imageMode(CENTER);
        translate(x * blockSize + blockSize / 2, y * blockSize + blockSize / 2);
        rotate((3 * PI) / 2 + PI / 4);
        image(cannonImg, 0, 0, blockSize * 1.5, blockSize * 1.5);
        pop();
      }
      // if dead cannon
      else if (
        map[y][x] === "5" ||
        map[y][x] === "6" ||
        map[y][x] === "7" ||
        map[y][x] === "8"
      ) {
        noFill();
        rect(x * blockSize, y * blockSize, blockSize, blockSize);
        image(dirtImg, x * blockSize, y * blockSize, blockSize, blockSize);
      }
    }
  }

  // draw character rotated based on charDir:
  push();
  imageMode(CENTER);
  // translate to center of the character cell
  translate(
    character.x * blockSize + blockSize / 2,
    character.y * blockSize + blockSize / 2
  );
  // map charDir to rotation angle (radians): 0=left, 1=up, 2=right, 3=down
  let angle = 0;
  if (charDir === 0) angle = 0; // left
  else if (charDir === 1) angle = HALF_PI; // up
  else if (charDir === 2) angle = scale(-1, 1); // right
  else if (charDir === 3) angle = -HALF_PI; // down
  rotate(angle);
  if (character.visible) {
    image(charImg, 0, 0, blockSize, blockSize);
  }
  pop();
  imageMode(CORNER); // restore default (optional)

  // draw all roundshots
  roundshots = renderRoundshots(roundshots, roundshotImg, blockSize);

  // if standing in laser, death
  if (map[character.y][character.x] === "L" && lasersOn) {
    gameState = "lose";
  }
  // if standing in end block, win
  if (map[character.y][character.x] === "E") {
    gameState = "win";
  }
}

// function to reset game at current level
function reset() {
  if (!character.canReset) {
    return;
  }

  character = {
    x: 0,
    y: 0,
    canMove: true,
    visible: true,
  };
  gameState = "play";

  // restore all knights
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === "D") {
        map[y][x] = "K";
      }
    }
  }

  // restore all cannons
  restoreCannons(map);
}

// respond to WASD and arrow key input, adjusting the character's x & y coordinates
function keyPressed() {
  // Up movement (W or UP_ARROW)
  if ((key === "w" || keyCode === UP_ARROW) && character.y > 0) {
    moveTo(character.x, character.y - 1);
    charDir = 1;
  }
  // Left movement (A or LEFT_ARROW)
  if ((key === "a" || keyCode === LEFT_ARROW) && character.x > 0) {
    moveTo(character.x - 1, character.y);
    charDir = 0;
  }
  // Down movement (S or DOWN_ARROW)
  if ((key === "s" || keyCode === DOWN_ARROW) && character.y < map.length - 1) {
    moveTo(character.x, character.y + 1);
    charDir = 3;
  }
  // Right movement (D or RIGHT_ARROW)
  if (
    (key === "d" || keyCode === RIGHT_ARROW) &&
    character.x < map[0].length - 1
  ) {
    moveTo(character.x + 1, character.y);
    charDir = 2;
  }

  // reset game
  if (key === "r") {
    reset();
  }
  // continue to next level
  if (key === "c" && gameState === "win") {
    changeLevel(mapIndex + 1);
  }
}

// move character to given coordinate, handles other behaviors
function moveTo(x, y) {
  // if cannot move
  if (!character.canMove) {
    return;
  }

  // if wall, do not move
  if (map[y][x] === "W") {
    return;
  }

  // if knight attacked block, lose
  const knights = [];
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === "K") {
        knights.push([x, y]);
      }
    }
  }
  for (const knight of knights) {
    const attackPositions = [
      [knight[0] + 2, knight[1] + 1],
      [knight[0] + 2, knight[1] - 1],
      [knight[0] - 2, knight[1] + 1],
      [knight[0] - 2, knight[1] - 1],
      [knight[0] + 1, knight[1] + 2],
      [knight[0] + 1, knight[1] - 2],
      [knight[0] - 1, knight[1] + 2],
      [knight[0] - 1, knight[1] - 2],
    ];
    for (const pos of attackPositions) {
      if (pos[0] === x && pos[1] === y) {
        character.x = x;
        character.y = y;
        knightSound.play();

        // if player is standing on knight
        if (map[y][x] === "K") {
          character.canMove = false;
          character.visible = false;
          setTimeout(() => {
            gameState = "lose";
          }, 500);
        }
        // if player is standing on other
        else {
          character.canMove = false;
          character.visible = false;
          const playerCell = map[y][x];
          map[knight[1]][knight[0]] = " ";
          map[y][x] = "K";

          setTimeout(() => {
            map[y][x] = playerCell;
            map[knight[1]][knight[0]] = "K";
            gameState = "lose";
          }, 500);
        }
        return;
      }
    }
  }

  // if cannon attacked block, lose
  const hit = handleCannonShoot(
    map,
    { x: x, y: y },
    cannonSound,
    roundshots,
    blockSize,
    character
  );
  if (hit) {
    character.canMove = false;
    setTimeout(() => {
      deathSound.play();
      gameState = "lose";

      // enable reset again
      character.canReset = true;
    }, 2000);
  }

  // if cannon block, eat cannon
  handleCannonEaten(map, { x: x, y: y }, chompSound);

  // if knight block, eat knight
  if (map[y][x] === "K") {
    character.x = x;
    character.y = y;
    chompSound.play();
    map[y][x] = "D";
    return;
  }

  // if empty space, move character
  character.x = x;
  character.y = y;
  move.play();
}

// flicker laser on/off every 1000 ms
setInterval(() => {
  lasersOn = !lasersOn;
}, 1000);

// change level to given index
function changeLevel(levelIndex) {
  // if map does not exist, return
  if (levelIndex < 0 || levelIndex >= maps.length) {
    console.log("Error: level does not exist at index " + levelIndex);
    return;
  }

  // update mapIndex, map, blockSize
  mapIndex = levelIndex;
  map = maps[mapIndex];
  blockSize = mapSize / map.length;

  // update level selection display
  const levelSelector = document.getElementById("level-selector");
  levelSelector.value = "";

  reset();
}

// level selector ui: on change, set new level
window.addEventListener("DOMContentLoaded", () => {
  const levelSelector = document.getElementById("level-selector");
  const lowRes = document.getElementById("low-res");

  // if user changes level from level selector, change level
  levelSelector.addEventListener("change", (event) => {
    const selectedLevel = event.target.value;
    changeLevel(parseInt(selectedLevel));
  });

  // if user toggles low resolution
  lowRes.addEventListener("change", () => {
    if (lowRes.checked) {
      mapSize = 300;
      resizeCanvas(mapSize, mapSize);
      blockSize = mapSize / map.length;
    } else {
      mapSize = 600;
      resizeCanvas(mapSize, mapSize);
      blockSize = mapSize / map.length;
    }
  });

  // Mobile controls: add event listeners for directional buttons
  // TODO: coco's task
  const btnUp = document.getElementById("btn-up");
  const btnDown = document.getElementById("btn-down");
  const btnLeft = document.getElementById("btn-left");
  const btnRight = document.getElementById("btn-right");

  btnUp.addEventListener("click", () => {
    if (character && character.y > 0) {
      moveTo(character.x, character.y - 1);
      charDir = 1;
    }
  });

  btnDown.addEventListener("click", () => {
    if (character && map && character.y < map.length - 1) {
      moveTo(character.x, character.y + 1);
      charDir = 3;
    }
  });

  btnLeft.addEventListener("click", () => {
    if (character && character.x > 0) {
      moveTo(character.x - 1, character.y);
      charDir = 0;
    }
  });

  btnRight.addEventListener("click", () => {
    if (character && map && map[0] && character.x < map[0].length - 1) {
      moveTo(character.x + 1, character.y);
      charDir = 2;
    }
  });
});
