function checkKnightAttack(map, x, y) {
  for (let ky = 0; ky < map.length; ky++) {
    for (let kx = 0; kx < map[ky].length; kx++) {
      if (map[ky][kx] === "K") {
        const dx = Math.abs(x - kx);
        const dy = Math.abs(y - ky);

        if (
            (dx === 2 && dy === 1) 
            || (dx === 1 && dy === 2)
        ) {
            character.x = x;
            character.y = y;
            character.canMove = false;
            character.visible = false;
            character.canReset = false;
            sounds.knight.play();

            map[ky][kx] = " ";
            map[y][x] = "K";

            setTimeout(() => {
              death(getRandom(deathMsgs.knight));
              character.canReset = true;
            }, 500);
            
            return;
        }
      }
    }
  }
  return;
}

function handleKnightEaten(map, x, y) {
  if (map[y][x] === "K") {
    character.x = x;
    character.y = y;
    sounds.chomp.play();
    map[y][x] = " ";
  }
}