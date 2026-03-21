let mapSize = 600;

let images;
let sounds;
let charDir;

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

// list of worlds / levels
let worlds = null; 
let worldIndex = 0;
let mapIndex = 0;
let map = null;

// time remaining
let time = null;
let timeLoop = null;

// msg to be displayed on death
let deathMsg = null;

// whether a nuke is active on map, set to false on death/win/reset
let nukeActive = false;

// ID of current level attempt, increment each reset
let runID = 0;

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
    textSize(18);

    let displayMsg = deathMsg === null ? "You Died!" : deathMsg;
    const wrappedText = wrapText(displayMsg, 30);
    wrappedText.forEach((line, index) => {
      text(line, width / 2, height / 2 - 20 + index * 20);
    });
    textSize(20);
    text("Press 'r' to restart", 
      width / 2, height / 2 + 50);
  }
  // if reached end: show ending screen
  else if (gameState === "win") {
    const currentWorld = worlds[worldIndex];
    const isLastLevel = mapIndex === currentWorld.levels.length - 1;

    background(255);
    fill(0);
    textAlign(CENTER, CENTER);
    if (!isLastLevel) {
      textSize(32);
      text("You Won!", width / 2, height / 2);
      textSize(20);
      text("Press 'c' to continue", width / 2, height / 2 + 40);
    } else {
      textSize(24);
      text("Congratulations, you completed this world!", width / 2, height / 2);
      textSize(18);
      text("Feel free to replay or try another world!", width / 2, height / 2 + 40);
    }
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
        image(images.dirt, x * blockSize, y * blockSize, blockSize, blockSize);
      }
      // if wall
      else if (map[y][x] === "W") {
        noFill();
        rect(x * blockSize, y * blockSize, blockSize, blockSize);
        image(images.stone, x * blockSize, y * blockSize, blockSize, blockSize);
      }
      // if laser
      else if (map[y][x] === "L") {
        push();
        noFill();
        rect(x * blockSize, y * blockSize, blockSize, blockSize);
        tint(100, 100, 255, 200);
        image(images.dirt, x * blockSize, y * blockSize, blockSize, blockSize);
        if (lasersOn) {
          noTint();
          image(images.laser, x * blockSize, y * blockSize, blockSize, blockSize);
        }
        pop();
      }
      // if end block
      else if (map[y][x] === "E") {
        noFill();
        image(images.door, x * blockSize, y * blockSize, blockSize, blockSize);
        rect(x * blockSize, y * blockSize, blockSize, blockSize);
      }
      // if knight block
      else if (map[y][x] === "K") {
        noFill();
        rect(x * blockSize, y * blockSize, blockSize, blockSize);
        image(images.dirt, x * blockSize, y * blockSize, blockSize, blockSize);
        image(images.knight, x * blockSize, y * blockSize, blockSize, blockSize);
      }
      // if cannon up
      else if (map[y][x] === "1") {
        noFill();
        rect(x * blockSize, y * blockSize, blockSize, blockSize);
        image(images.dirt, x * blockSize, y * blockSize, blockSize, blockSize);
        push();
        imageMode(CENTER);
        translate(x * blockSize + blockSize / 2, y * blockSize + blockSize / 2);
        rotate(PI + PI / 4);
        image(images.cannon, 0, 0, blockSize * 1.5, blockSize * 1.5);
        pop();
      }
      // if cannon down
      else if (map[y][x] === "2") {
        noFill();
        rect(x * blockSize, y * blockSize, blockSize, blockSize);
        image(images.dirt, x * blockSize, y * blockSize, blockSize, blockSize);
        push();
        imageMode(CENTER);
        translate(x * blockSize + blockSize / 2, y * blockSize + blockSize / 2);
        rotate(PI / 4);
        image(images.cannon, 0, 0, blockSize * 1.5, blockSize * 1.5);
        pop();
      }
      // if cannon right
      else if (map[y][x] === "3") {
        noFill();
        rect(x * blockSize, y * blockSize, blockSize, blockSize);
        image(images.dirt, x * blockSize, y * blockSize, blockSize, blockSize);
        push();
        imageMode(CENTER);
        translate(x * blockSize + blockSize / 2, y * blockSize + blockSize / 2);
        rotate(PI / 2 + PI / 4);
        image(images.cannon, 0, 0, blockSize * 1.5, blockSize * 1.5);
        pop();
      }
      // if cannon left
      else if (map[y][x] === "4") {
        noFill();
        rect(x * blockSize, y * blockSize, blockSize, blockSize);
        image(images.dirt, x * blockSize, y * blockSize, blockSize, blockSize);
        push();
        imageMode(CENTER);
        translate(x * blockSize + blockSize / 2, y * blockSize + blockSize / 2);
        rotate((3 * PI) / 2 + PI / 4);
        image(images.cannon, 0, 0, blockSize * 1.5, blockSize * 1.5);
        pop();
      }
      // if nuke
      else if (map[y][x] === "N") {
        noFill();
        rect(x * blockSize, y * blockSize, blockSize, blockSize);
        image(images.nuke, x * blockSize, y * blockSize, blockSize, blockSize);
      }
      // if active nuke
      else if (map[y][x] === "A") {
        push();
        noFill();
        rect(x * blockSize, y * blockSize, blockSize, blockSize);
        tint(255, 0, 0, 255);
        image(images.nuke, x * blockSize, y * blockSize, blockSize, blockSize);
        pop();
      }
      // if bubble
      else if (map[y][x] === "B") {
        noFill();
        rect(x * blockSize, y * blockSize, blockSize, blockSize);
        image(images.dirt, x * blockSize, y * blockSize, blockSize, blockSize);
        image(images.bubble, x * blockSize, y * blockSize, blockSize, blockSize);
      }
      // if hammer
      else if (map[y][x] === "H") {
        noFill();
        rect(x * blockSize, y * blockSize, blockSize, blockSize);
        image(images.dirt, x * blockSize, y * blockSize, blockSize, blockSize);
        image(images.hammer, x * blockSize, y * blockSize, blockSize, blockSize);
      }
      // if rock
      else if (map[y][x] === "R") {
        noFill();
        rect(x * blockSize, y * blockSize, blockSize, blockSize);
        image(images.dirt, x * blockSize, y * blockSize, blockSize, blockSize);
        image(images.rock, x * blockSize, y * blockSize, blockSize, blockSize);
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
    image(images.char, 0, 0, blockSize, blockSize);
  }
  pop();
  imageMode(CORNER); // restore default (optional)

  // draw all roundshots
  roundshots = renderRoundshots(roundshots, images.roundshot, blockSize);

  // if standing in laser, death
  if (map[character.y][character.x] === "L" && lasersOn) {
    death(getRandom(deathMsgs.laser));
    sounds.laserDeath.play();
  }

  // if standing in end block, win
  if (map[character.y][character.x] === "E") {
    sounds.nuke.stop();
    gameState = "win";
    nukeActive = false;
  }
}

// function to reset game at current level
function reset() {
  // if cannot reset, return
  if (character && !character.canReset) {
    return;
  }

  map = worlds[worldIndex].levels[mapIndex].map;
  blockSize = mapSize / map.length;

  gameState = "play";

  // reset character
  character = {
    x: 0,
    y: 0,
    canMove: true,
    visible: true,
    canReset: true,
    hammerCount: 0,
  };

  // Inside render() or wherever you update your UI:
  updateLevelUI(`World ${worldIndex + 1} - Level ${mapIndex + 1}`);
  updateHammerUI(character.hammerCount);

  // reset time
  time = worlds[worldIndex].levels[mapIndex].time;
  updateTimeUI(time);

  if (timeLoop !== null) {
    clearInterval(timeLoop);
  }
  timeLoop = setInterval(() => {
    if (gameState === "play") {
      time -= 1;
      updateTimeUI(time);

      if (time <= 0) {
        death("You ran out of time!");
        clearInterval(timeLoop);
      }
      if (gameState !== "play") {
        clearInterval(timeLoop);
      }
    }
  }, 1000);

  // restore map (deep copy)
  map = worlds[worldIndex].levels[mapIndex].map.map(row => [...row]);

  // setup random walls
  setupRandomWalls(map);

  // reset nukeActive
  nukeActive = false;
  sounds.nuke.stop();

  // increment runID
  runID += 1;
}

function death(msg) {
  gameState = "lose";
  deathMsg = msg;

  nukeActive = false;
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
    const currentWorld = worlds[worldIndex];
    const isLastLevel = mapIndex === currentWorld.levels.length - 1;

    if (!isLastLevel) {
      changeLevel(mapIndex + 1);
    } else {
      console.log("World complete. Progression via 'C' disabled.");
    }
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

  // if wall / nuke, do not move
  if (map[y][x] === "W" || map[y][x] === "N" || map[y][x] === "A") {
    return;
  }

  // if rock, check for hammers
  if (map[y][x] === "R") {
    if (character.hammerCount > 0) {
      // consume one hammer and clear the path
      character.hammerCount -= 1;
      updateHammerUI(character.hammerCount);
      map[y][x] = " ";
      sounds.rockBreak.play();
    } else {
      return;
    }
  }

  // if bubble, replace with empty space and add 10 seconds to timer
  if (map[y][x] === "B") {
    map[y][x] = " ";
    time += 10;
    sounds.chomp.play();
  }

  // if hammer, replace with empty space and increment hammerCount
  if (map[y][x] === "H") {
    map[y][x] = " ";
    character.hammerCount += 1;
    updateHammerUI(character.hammerCount);
    sounds.chomp.play();
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
        sounds.knight.play();

        // if player is standing on knight
        if (map[y][x] === "K") {
          character.canMove = false;
          character.visible = false;
          character.canReset = false;
          setTimeout(() => {
            death(getRandom(deathMsgs.knight));
            character.canReset = true;
          }, 500);
        }
        // if player is standing on other
        else {
          character.canMove = false;
          character.visible = false;
          character.canReset = false;
          map[knight[1]][knight[0]] = " ";
          map[y][x] = "K";

          setTimeout(() => {
            death(getRandom(deathMsgs.knight));
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
    sounds.cannon,
    roundshots,
    blockSize,
    character
  );
  if (hit) {
    character.canMove = false;
    character.canReset = false;

    setTimeout(() => {
      sounds.death.play();
      death(getRandom(deathMsgs.cannon));

      // enable reset again
      character.canReset = true;
    }, 2000);
  }

  // if cannon block, eat cannon
  handleCannonEaten(map, { x: x, y: y }, sounds.chomp);

  // if knight block, eat knight
  if (map[y][x] === "K") {
    character.x = x;
    character.y = y;
    sounds.chomp.play();
    map[y][x] = " ";
    return;
  }

  // if adjacent to nuke, activate
  // set nukeActive true if a nuke was activated
  nukeActive = checkNukes(
    (nukeRunID) => {      
      // if nuke is not active
      if (nukeActive === false) {
        sounds.nuke.stop();
        return;
      }
      // if runID does not match
      else if (nukeRunID !== runID) {
        return;
      }
      // if nuke is active
      else {
        sounds.nuke.stop();
        death(getRandom(deathMsgs.nuke));
        sounds.nukeExplosion.play();
      }
    },
    map, { x: x, y: y }, sounds.nuke, runID)
    || nukeActive;

  // if empty space, move character
  character.x = x;
  character.y = y;
  sounds.move.play();
}

// flicker laser on/off every 1000 ms
setInterval(() => {
  lasersOn = !lasersOn;
}, 1000);

// change level to given index within the current world
function changeLevel(levelIndex) {
  // worlds null case
  if (worlds === null) {
    return;
  }

  const currentWorld = worlds[worldIndex];

  // if level does not exist in current world, return
  if (levelIndex < 0 || levelIndex >= currentWorld.levels.length) {
    console.log("Error: level does not exist at index " + levelIndex + " in world " + worldIndex);
    return;
  }

  // update mapIndex and extract the map from the nested levels array
  mapIndex = levelIndex;
  map = currentWorld.levels[mapIndex].map;
  blockSize = mapSize / map.length;

  reset();
}