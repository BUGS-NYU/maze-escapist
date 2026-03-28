function checkBishopAttack(map, character) {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === "X") {
        if (Math.abs(character.x - x) === Math.abs(character.y - y)) {
          if (isDiagonalPathClear(map, x, y, character.x, character.y)) {
            return true;
          }
        }
      }
    }
  }
  return false;
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
    return true;
  }
  return false;
}