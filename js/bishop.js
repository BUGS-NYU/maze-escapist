function checkBishopAttack(map, target) {
  const { x, y } = target;
  for (let ky = 0; ky < map.length; ky++) {
    for (let kx = 0; kx < map[ky].length; kx++) {
      if (map[ky][kx] === "X") {
        if (Math.abs(x - kx) === Math.abs(y - ky)) {
          if (isDiagonalPathClear(map, kx, ky, x, y)) {
            character.x = x;
            character.y = y;
            character.canMove = false;
            character.canReset = false;

            map[ky][kx] = " ";
            map[y][x] = "X";

            sounds.bishop.play(0, 1, 1, 0, 2);

            setTimeout(() => {
              death("The Bishop captured you!");
              character.canReset = true;
            }, 2000);

            return;
          }
        }
      }
    }
  }
}

function isDiagonalPathClear(map, x1, y1, x2, y2) {
  let dx = x2 > x1 ? 1 : -1;
  let dy = y2 > y1 ? 1 : -1;
  let currX = x1 + dx;
  let currY = y1 + dy;

  while (currX !== x2 && currY !== y2) {
    if (!isOpenCell(map[currY][currX])) {
      return false;
    }
    currX += dx;
    currY += dy;
  }
  return true;
}

function eatBishop(map, x, y) {
  if (map[y][x] === "X") {
    map[y][x] = " ";
    sounds.chomp.play();
  }
}