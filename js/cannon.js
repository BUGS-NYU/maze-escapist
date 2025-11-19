// if player is in any cannon's firing range, handle character death and animation
// returns whether player was hit by cannon
function handleCannonShoot(map, characterPos, cannonSound) {
    // for each cell, check if its cannon
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map.length; x++) {
            let attackPos = null;

            // up cannon
            if (map[y][x] === "1") {
                // get attacked cells
                const cells = [];
                let y1 = y - 1;
                while (y1 >= 0 && map[y1][x] === " ") {
                    cells.push({ x: x, y: y1 });
                    y1 -= 1;
                }

                // if player attacked, store attack coordinate
                for (const cell of cells) {
                    if (cell.x === characterPos.x && cell.y === characterPos.y) {
                        attackPos = { x: characterPos.x, y: characterPos.y };
                    }
                }
            }
            // down cannon
            if (map[y][x] === "2") {
                // get attacked cells
                const cells = [];
                let y1 = y + 1;
                while (y1 < map.length && map[y1][x] === " ") {
                    cells.push({ x: x, y: y1 });
                    y1 += 1;
                }

                // if player attacked, store attack coordinate
                for (const cell of cells) {
                    if (cell.x === characterPos.x && cell.y === characterPos.y) {
                        attackPos = { x: characterPos.x, y: characterPos.y };
                    }
                }
            }
            // left cannon
            if (map[y][x] === "3") {
                // get attacked cells
                const cells = [];
                let x1 = x - 1;
                while (x1 >= 0 && map[y][x1] === " ") {
                    cells.push({ x: x1, y: y });
                    x1 -= 1;
                }

                // if player attacked, store attack coordinate
                for (const cell of cells) {
                    if (cell.x === characterPos.x && cell.y === characterPos.y) {
                        attackPos = { x: characterPos.x, y: characterPos.y };
                    }
                }
            }
            // right cannon
            if (map[y][x] === "4") {
                // get attacked cells
                const cells = [];
                let x1 = x + 1;
                while (x1 < map[0].length && map[y][x1] === " ") {
                    cells.push({ x: x1, y: y });
                    x1 += 1;
                }

                // if player attacked, store attack coordinate
                for (const cell of cells) {
                    if (cell.x === characterPos.x && cell.y === characterPos.y) {
                        attackPos = { x: characterPos.x, y: characterPos.y };
                    }
                }
            }

            // return whether player was attacked
            if (attackPos !== null) {
                cannonSound.play();

                return true;
            }
        }
    }
    return false;
}

function handleCannonEaten(map) {
    //
}