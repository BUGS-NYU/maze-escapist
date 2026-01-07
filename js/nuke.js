/**
 * Check whether character is adjacent to nuke, if so then activate
 * Return whether nukeID if activated, -1 otherwise
 */
function checkNukes(explosionCallback, map, characterPos, nukeSound, runID) {
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
    let nukeActivated = false;
    for (const nuke of nukes) {
        for (const cell of adjacentCells) {
            if (nuke.x === cell.x && nuke.y === cell.y) {
                activateNuke(explosionCallback, map, nuke, nukeSound, runID);
                nukeActivated = true;
            }
        }
    }
    return nukeActivated;
}

/**
 * Activate nuke
 */
function activateNuke(explosionCallback, map, nuke, nukeSound, runID) {
    map[nuke.y][nuke.x] = "A";

    // if another nuke already active: stop
    if (nukeSound.isPlaying()) {
        return;
    }

    nukeSound.play();
    nukeSound.jump(2.4);

    // on explosion
    setTimeout(() => {
        explosionCallback(runID);
    }, 3100);
}