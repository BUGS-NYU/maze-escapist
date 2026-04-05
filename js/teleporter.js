function teleport(map, { x, y }, character, cell) {
    let targetX = x;
    let targetY = y;

    if (cell === "5") targetY -= 2;
    else if (cell === "6") targetY += 2;
    else if (cell === "7") targetX -= 2;
    else if (cell === "8") targetX += 2;

    if (targetX !== x || targetY !== y) {
        targetX = constrain(targetX, 0, map[0].length - 1);
        targetY = constrain(targetY, 0, map.length - 1);

        const targetCell = map[targetY][targetX];
        if (targetCell !== "W" && targetCell !== "N" && targetCell !== "A" && targetCell !== "R") {
        character.x = targetX;
        character.y = targetY;
        } else {
        character.x = x;
        character.y = y;
        }
    } else {
        character.x = x;
        character.y = y;
    }

    return targetX !== x || targetY !== y;
}