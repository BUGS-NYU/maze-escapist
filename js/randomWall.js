/**
 * Function to edit map in-place such that pairs of random wall cells (9 or 0) are replaced with walls as necessary
 * @param {*} map 
 */
function setupRandomWalls(map) {
    // get each random pair coordinates
    const pairs = {}; // { "9": [[x, y], [x, y]] }
    const randoms = ["9", "0", "-"];
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (randoms.includes(map[y][x])) {
                // if pair does not exist
                if (!pairs[map[y][x]]) {
                    pairs[map[y][x]] = [[x, y]];
                }
                // if pair exists
                else {
                    pairs[map[y][x]].push([x, y]);
                }
            }
        }
    }

    // replace random pairs w walls
    for (let randomId in pairs) {
        const pair1 = pairs[randomId][0];
        const pair2 = pairs[randomId][1];
        const randomIndex = Math.floor(Math.random() * 2);
        if (randomIndex === 0) {
            map[pair1[1]][pair1[0]] = "W";
            map[pair2[1]][pair2[0]] = " ";
        } else if (randomIndex === 1) {
            map[pair1[1]][pair1[0]] = " ";
            map[pair2[1]][pair2[0]] = "W";
        }
    }
}