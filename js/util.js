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