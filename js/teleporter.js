function teleport(map, { x, y }, character, cell) {
    let targetX = x;
    let targetY = y;

    if (cell === "5") targetY -= 2;
    else if (cell === "6") targetY += 2;
    else if (cell === "7") targetX -= 2;
    else if (cell === "8") targetX += 2;

    if (targetX !== x || targetY !== y) {
        // undefined safety
        const targetCell = map[targetY] ? map[targetY][targetX] : undefined;

        // out of bounds
        if (targetCell === undefined) {
            return false;
        }
        // if wall
        else if (isWall(targetCell)) {
            return false;
        }
        // if can teleport
        else {
            moveTo(targetX, targetY);
        }
    } else {
        character.x = x;
        character.y = y;
    }

    return targetX !== x || targetY !== y;
}