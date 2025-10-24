const mapSize = 300
let character = [2, 2]
const blockSize = mapSize / 5

// create a map 2d grid
const map = [
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 1, 0, 0],
    [0, 1, 1, 1, 0],
]

function setup() {
    createCanvas(mapSize, mapSize)
}

function draw() {
    background(200)

    noFill()
    stroke(150)
    strokeWeight(2)

    // draw map using our 2-dimensional grid. each item in the grid represents one block on map
    for (let y = 0; y < 5; y++) {
        for (let x = 0; x < 5; x++) {
            if (map[y][x] === 1) {
                fill(100)
            } else {
                noFill()
            }
            rect(x * blockSize, y * blockSize, blockSize, blockSize)
        }
    }

    // draw character, its coordinates determine where it stands on the map
    fill(0)
    noStroke()
    ellipse(
        character[0] * blockSize + (blockSize / 2),
        character[1] * blockSize + (blockSize / 2),
        30, 30)
}

// respond to WASD input, adjusting the character's x & y coordinates
function keyPressed() {
    if (key === "w" && character[1] > 0) {
        character[1] -= 1
    }
    if (key === "a" && character[0] > 0) {
        character[0] -= 1
    }
    if (key === "s" && character[1] < 4) {
        character[1] += 1
    }
    if (key === "d" && character[0] < 4) {
        character[0] += 1
    }
}
