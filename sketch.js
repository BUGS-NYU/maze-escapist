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
let doorImg;

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

// list of level objects
let maps = null;
let mapIndex = 0;
let map = null;

// time remaining
let time = null;
let timeLoop = null;

// msg to be displayed on death
let deathMsg = null;

function preload() {
  // load map by maps.json
  loadJSON("data/maps.json", (data) => {
    maps = data;
    map = maps[mapIndex].map;

    character = {
      x: 0,
      y: 0,
      canMove: true,
      visible: true,
      canReset: true,
    };
    reset();
  });

  // load imgs here
  laserImg = loadImage("images/laser.png");
  charImg = loadImage("images/character.png");
  knightImg = loadImage("images/knight.png");
  charDir = 0;
  dirtImg = loadImage("images/dirt.jpg");
  stoneImg = loadImage("images/stone.png");
  cannonImg = loadImage("images/cannon.webp");
  roundshotImg = loadImage("images/roundshot.png");
  doorImg = loadImage("images/door.jpg");

  // load sounds here
  move = loadSound("sounds/move.mp3");
  knightSound = loadSound("sounds/knight-sound.mp3");
  chompSound = loadSound("sounds/chomp.mp3");
  cannonSound = loadSound("sounds/cannon.mp3");
  deathSound = loadSound("sounds/villager.mp3");
  laserDeathSound = loadSound("sounds/death.mp3");

  // needed to prevent audio-related performance issues
  move.playMode("restart");
  knightSound.playMode("restart");
  chompSound.playMode("restart");
  cannonSound.playMode("restart");
  deathSound.playMode("restart");
  laserDeathSound.playMode("restart");
}

function setup() {
  // put canvas inside #canvas-container div
  const canvasContainer = document.getElementById("canvas-container");
  const canvas = createCanvas(mapSize, mapSize);
  canvas.parent(canvasContainer);
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
    text(deathMsg === null ? "You Died!" : deathMsg, width / 2, height / 2);
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
  // no map case
  if (map === null) {
    return;
  }

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
        noFill();
        image(doorImg, x * blockSize, y * blockSize, blockSize, blockSize);
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

  // draw time remaining
  if (time !== null) {
    fill(255);
    textSize(20);
    text(`Time: ${time}`, 510, 30);
  }

  // if standing in laser, death
  if (map[character.y][character.x] === "L" && lasersOn) {
    death("You were hit by a laser!");
    laserDeathSound.play();
  }
  // if standing in end block, win
  if (map[character.y][character.x] === "E") {
    gameState = "win";
  }
}

// function to reset game at current level
function reset() {
  // if cannot reset, return
  if (!character.canReset) {
    return;
  }

  gameState = "play";

  // reset character
  character = {
    x: 0,
    y: 0,
    canMove: true,
    visible: true,
    canReset: true,
  };

  // reset time
  time = maps[mapIndex].time;
  if (timeLoop !== null) {
    clearInterval(timeLoop);
  }
  timeLoop = setInterval(() => {
    if (gameState === "play") {
      time -= 1;

      if (time <= 0) {
        death("You ran out of time!");
        clearInterval(timeLoop);
      }
      if (gameState !== "play") {
        clearInterval(timeLoop);
      }
    }
  }, 1000);

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

function death(msg) {
  gameState = "lose";
  deathMsg = msg;
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

  // Prevent default scrolling for arrow keys (return false after handling)
  if (
    keyCode === UP_ARROW ||
    keyCode === DOWN_ARROW ||
    keyCode === LEFT_ARROW ||
    keyCode === RIGHT_ARROW
  ) {
    return false; // Prevent default browser behavior (scrolling)
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
          character.canReset = false;
          setTimeout(() => {
            death("You were eaten by a knight!");
            character.canReset = true;
          }, 500);
        }
        // if player is standing on other
        else {
          character.canMove = false;
          character.visible = false;
          character.canReset = false;
          const playerCell = map[y][x];
          map[knight[1]][knight[0]] = " ";
          map[y][x] = "K";

          setTimeout(() => {
            map[y][x] = playerCell;
            map[knight[1]][knight[0]] = "K";
            death("You were eaten by a knight!");
            character.canReset = true;
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
    character.canReset = false;

    setTimeout(() => {
      deathSound.play();
      death("You were shot by a cannon!");

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
  // maps null case
  if (maps === null) {
    return;
  }

  // if map does not exist, return
  if (levelIndex < 0 || levelIndex >= maps.length) {
    console.log("Error: level does not exist at index " + levelIndex);
    return;
  }

  // update mapIndex, map, blockSize
  mapIndex = levelIndex;
  map = maps[mapIndex].map;
  blockSize = mapSize / map.length;

  reset();
}

// level selector ui: on change, set new level
window.addEventListener("DOMContentLoaded", () => {
  // Prevent default scrolling for arrow keys
  document.addEventListener("keydown", function (event) {
    // Check for arrow keys
    if (
      event.key === "ArrowUp" ||
      event.key === "ArrowDown" ||
      event.key === "ArrowLeft" ||
      event.key === "ArrowRight"
    ) {
      event.preventDefault(); // Stop the default scroll behavior
    }
  });

  const lowRes = document.getElementById("low-res");

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
  const btnUp = document.getElementById("btn-up");
  const btnDown = document.getElementById("btn-down");
  const btnLeft = document.getElementById("btn-left");
  const btnRight = document.getElementById("btn-right");
  const btnReset = document.getElementById("btn-reset");
  const btnContinue = document.getElementById("btn-continue");

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

  btnReset.addEventListener("click", () => {
    reset();
  });

  btnContinue.addEventListener("click", () => {
    if (gameState === "win") {
      changeLevel(mapIndex + 1);
    }
  });

  // Swipe detection for touch and mouse/trackpad
  let touchStartX = null;
  let touchStartY = null;
  let mouseStartX = null;
  let mouseStartY = null;
  let isMouseDown = false;
  const minSwipeDistance = 30; // Minimum distance in pixels to register a swipe

  function handleSwipe(startX, startY, endX, endY) {
    const deltaX = endX - startX;
    const deltaY = endY - startY;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    // Check if swipe is significant enough
    if (absDeltaX < minSwipeDistance && absDeltaY < minSwipeDistance) {
      return;
    }

    // Determine swipe direction (prioritize the larger movement)
    if (absDeltaX > absDeltaY) {
      // Horizontal swipe
      if (deltaX > 0) {
        // Swipe right
        if (character && map && map[0] && character.x < map[0].length - 1) {
          moveTo(character.x + 1, character.y);
          charDir = 2;
        }
      } else {
        // Swipe left
        if (character && character.x > 0) {
          moveTo(character.x - 1, character.y);
          charDir = 0;
        }
      }
    } else {
      // Vertical swipe
      if (deltaY > 0) {
        // Swipe down
        if (character && map && character.y < map.length - 1) {
          moveTo(character.x, character.y + 1);
          charDir = 3;
        }
      } else {
        // Swipe up
        if (character && character.y > 0) {
          moveTo(character.x, character.y - 1);
          charDir = 1;
        }
      }
    }
  }

  // Wait for canvas to be created, then add swipe listeners
  function addSwipeListeners() {
    const canvas = document.querySelector("canvas");
    if (!canvas) {
      // Canvas not ready yet, try again
      setTimeout(addSwipeListeners, 100);
      return;
    }

    // Touch events for mobile
    canvas.addEventListener("touchstart", (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
    });

    canvas.addEventListener("touchend", (e) => {
      e.preventDefault();
      if (touchStartX === null || touchStartY === null) return;

      const touch = e.changedTouches[0];
      handleSwipe(touchStartX, touchStartY, touch.clientX, touch.clientY);
      touchStartX = null;
      touchStartY = null;
    });

    // Mouse/trackpad events for desktop
    canvas.addEventListener("mousedown", (e) => {
      isMouseDown = true;
      mouseStartX = e.clientX;
      mouseStartY = e.clientY;
    });

    canvas.addEventListener("mousemove", (e) => {
      if (!isMouseDown) return;
      // Don't handle during move, wait for mouseup
    });

    canvas.addEventListener("mouseup", (e) => {
      if (!isMouseDown) return;
      if (mouseStartX === null || mouseStartY === null) return;

      handleSwipe(mouseStartX, mouseStartY, e.clientX, e.clientY);
      isMouseDown = false;
      mouseStartX = null;
      mouseStartY = null;
    });

    // Handle mouse leaving canvas while dragging
    canvas.addEventListener("mouseleave", () => {
      isMouseDown = false;
      mouseStartX = null;
      mouseStartY = null;
    });
  }

  // Start trying to add swipe listeners
  addSwipeListeners();

  // change level modal
  const changeButton = document.getElementById("change-level");
  const changeModal = document.getElementById("change-level-modal");

  // change button click: toggle modal show
  changeButton.addEventListener("click", () => {
    if (changeModal.style.display === "none") {
      changeModal.style.display = "grid";
    } else if (changeModal.style.display === "grid") {
      changeModal.style.display = "none";
    }
  });

  // level button click: change level & close modal
  const levelButtons = changeModal.querySelectorAll("button");
  levelButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedLevel = button.value;
      changeLevel(parseInt(selectedLevel));
      changeModal.style.display = "none";
    });
  });
});
