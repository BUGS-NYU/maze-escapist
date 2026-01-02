/**
 * Check whether character is adjacent to nuke, if so then activate
 */
function checkNukes(map, characterPos, nukeSound, deathFunc, cannonSound) {
    // get nukes
    const nukes = [];
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] === "N") {
                nukes.push({ x: x, y: y });
            }
        }
    }

    // get adjacent cells
    const adjacentCells = [
        { x: characterPos.x - 1, y: characterPos.y },
        { x: characterPos.x + 1, y: characterPos.y },
        { x: characterPos.x, y: characterPos.y - 1 },
        { x: characterPos.x, y: characterPos.y + 1 },
    ];

    // activate any adjacent nukes
    for (const nuke of nukes) {
        for (const cell of adjacentCells) {
            if (nuke.x === cell.x && nuke.y === cell.y) {
                activateNuke(map, nuke, nukeSound, deathFunc, cannonSound);
            }
        }
    }
}

/**
 * Activate nuke
 */
function activateNuke(map, nuke, nukeSound, deathFunc, cannonSound) {
    map[nuke.y][nuke.x] = "A";
    nukeSound.play();
    nukeSound.jump(2.4);

    // on explosion
    setTimeout(() => {
        nukeSound.stop();
        deathFunc("You were obliterated by a nuke!");
        cannonSound.rate(0.3);
        cannonSound.play();
    }, 3100);
}