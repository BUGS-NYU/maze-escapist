// returns whether given cell character is an open cell
// (used to determine whether cannon can shoot through it)
function isOpenCell(cell) {
    return cell === " " || cell === "D" || cell === "L"
    || cell === "5" || cell === "6" || cell === "7" || cell === "8";
}

// returns whether given cell character is knight/cannon
// (used when character tries to eat an obstacle protected by cannon)
function isObstacle(cell) {
    return cell === "K"
    || cell === "1" || cell === "2" || cell === "3" || cell === "4";
}

// if player is in any cannon's firing range, handle character death and animation
// returns whether player was hit by cannon
function handleCannonShoot(map, characterPos, cannonSound, roundShots, blockSize) {
    // for each cell, check if its cannon
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map.length; x++) {
            let attackPos = null;
            let cannonPos = null;

            // up cannon
            if (map[y][x] === "1") {
                // get attacked cells
                const cells = [];
                let y1 = y - 1;
                while (y1 >= 0 && isOpenCell(map[y1][x])) {
                    cells.push({ x: x, y: y1 });
                    y1 -= 1;
                }

                // cannon attacks obstacle edge case
                if (y1 >= 0 && isObstacle(map[y1][x])) {
                    cells.push({ x: x, y: y1 });
                }

                // if player attacked, store attack coordinate
                for (const cell of cells) {
                    if (cell.x === characterPos.x && cell.y === characterPos.y) {
                        attackPos = { x: characterPos.x, y: characterPos.y };
                        cannonPos = { x: x, y: y };
                    }
                }
            }
            // down cannon
            if (map[y][x] === "2") {
                // get attacked cells
                const cells = [];
                let y1 = y + 1;
                while (y1 < map.length && isOpenCell(map[y1][x])) {
                    cells.push({ x: x, y: y1 });
                    y1 += 1;
                }

                // cannon attacks obstacle edge case
                if (y1 < map.length && isObstacle(map[y1][x])) {
                    cells.push({ x: x, y: y1 });
                }

                // if player attacked, store attack coordinate
                for (const cell of cells) {
                    if (cell.x === characterPos.x && cell.y === characterPos.y) {
                        attackPos = { x: characterPos.x, y: characterPos.y };
                        cannonPos = { x: x, y: y };
                    }
                }
            }
            // left cannon
            if (map[y][x] === "3") {
                // get attacked cells
                const cells = [];
                let x1 = x - 1;
                while (x1 >= 0 && isOpenCell(map[y][x1])) {
                    cells.push({ x: x1, y: y });
                    x1 -= 1;
                }

                // cannon attacks obstacle edge case
                if (x1 >= 0 && isObstacle(map[y][x1])) {
                    cells.push({ x: x1, y: y });
                }

                // if player attacked, store attack coordinate
                for (const cell of cells) {
                    if (cell.x === characterPos.x && cell.y === characterPos.y) {
                        attackPos = { x: characterPos.x, y: characterPos.y };
                        cannonPos = { x: x, y: y };
                    }
                }
            }
            // right cannon
            if (map[y][x] === "4") {
                // get attacked cells
                const cells = [];
                let x1 = x + 1;
                while (x1 < map[0].length && isOpenCell(map[y][x1])) {
                    cells.push({ x: x1, y: y });
                    x1 += 1;
                }

                // cannon attacks obstacle edge case
                if (x1 < map[0].length && isObstacle(map[y][x1])) {
                    cells.push({ x: x1, y: y });
                }

                // if player attacked, store attack coordinate
                for (const cell of cells) {
                    if (cell.x === characterPos.x && cell.y === characterPos.y) {
                        attackPos = { x: characterPos.x, y: characterPos.y };
                        cannonPos = { x: x, y: y };
                    }
                }
            }

            // return whether player was attacked
            if (attackPos !== null) {
                // update roundshots to animate cannon's shot
                roundshots.push({
                    startX: cannonPos.x * blockSize + (blockSize / 2),
                    startY: cannonPos.y * blockSize + (blockSize / 2),
                    endX: attackPos.x * blockSize + (blockSize / 2),
                    endY: attackPos.y * blockSize + (blockSize / 2),
                    currX: cannonPos.x * blockSize + (blockSize / 2),
                    currY: cannonPos.y * blockSize + (blockSize / 2)
                });

                cannonSound.play();

                return true;
            }
        }
    }
    return false;
}

// if character is on cannon, handle cannon eating functionality
function handleCannonEaten(map, characterPos, chompSound) {
    // cannon up case
    if (map[characterPos.y][characterPos.x] === "1") {
        chompSound.play();
        map[characterPos.y][characterPos.x] = "5";
    }
    // cannon down case
    if (map[characterPos.y][characterPos.x] === "2") {
        chompSound.play();
        map[characterPos.y][characterPos.x] = "6";
    }
    // cannon left case
    if (map[characterPos.y][characterPos.x] === "3") {
        chompSound.play();
        map[characterPos.y][characterPos.x] = "7";
    }
    // cannon right case
    if (map[characterPos.y][characterPos.x] === "4") {
        chompSound.play();
        map[characterPos.y][characterPos.x] = "8";
    }
}

// animate all moving roundshots on the map, represented in the roundshots array
    // Assumption: all roundshots either travel horizontal or vertical (either dx or dy is 0)
function renderRoundshots(roundshots, roundshotImg, blockSize) {
    for (const roundshot of roundshots) {
        // draw roundshot img
        push();
        imageMode(CENTER);
        image(roundshotImg, roundshot.currX, roundshot.currY, blockSize / 1.7, blockSize / 1.7);
        pop();

        // update roundshot position
        const dx = roundshot.endX - roundshot.startX;
        const dy = roundshot.endY - roundshot.startY;
        if (dx === 0) {
            if (dy >= 0) {
                roundshot.currY += 20
            } else {
                roundshot.currY -= 20
            }
        } else if (dy === 0) {
            if (dx >= 0) {
                roundshot.currX += 20
            } else {
                roundshot.currX -= 20
            }
        }
    }

    // filter any roundshots that reached destination
    return roundshots.filter((rs) => {
        const dx = rs.endX - rs.startX;
        const dy = rs.endY - rs.startY;
        if (dy === 0) {
            return rs.currX === constrain(rs.currX, min(rs.startX, rs.endX), max(rs.startX, rs.endX));
        }
        if (dx === 0) {
            return rs.currY === constrain(rs.currY, min(rs.startY, rs.endY), max(rs.startY, rs.endY));
        }
        return false;
    });
}

// restore all dead cannons to living ones (called when map is reset)
function restoreCannons(map) {
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] === "5") {
                map[y][x] = "1";
            }
            if (map[y][x] === "6") {
                map[y][x] = "2";
            }
            if (map[y][x] === "7") {
                map[y][x] = "3";
            }
            if (map[y][x] === "8") {
                map[y][x] = "4";
            }
        }
    }
}