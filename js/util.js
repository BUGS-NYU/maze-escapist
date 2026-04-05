function wrapText(text, maxWidth) {
    const words = text.split(" ");
    let lines = [];
    let currentLine = "";

    for (let word of words) {
        if ((currentLine + word).length > maxWidth) {
            lines.push(currentLine.trim());
            currentLine = word + " ";
        } else {
            currentLine += word + " ";
        }
    }
    lines.push(currentLine.trim());
    return lines;
}

function getRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

// returns whether given cell character is an open cell
// (used to determine whether cannon can shoot through it)
function isOpenCell(cell) {
    return cell === " " || cell === "L";
}

function isWall(cell) {
    return cell === "W" || cell === "N" || cell === "A" || cell === "R";
}