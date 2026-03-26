let lastGuiMove = 0;
const moveDelay = 200;

function handleGamepadInput() {
  const gamepads = navigator.getGamepads();
  const gp = gamepads[0]; 
  if (!gp || millis() - lastGuiMove < moveDelay) return;

  const xAxis = gp.axes[0];
  const yAxis = gp.axes[1];
  const threshold = 0.5;

  if (yAxis < -threshold) { 
    if (character && character.y > 0) {
      moveTo(character.x, character.y - 1);
      charDir = 1;
      lastGuiMove = millis();
    }
  } else if (yAxis > threshold) {
    if (character && map && character.y < map.length - 1) {
      moveTo(character.x, character.y + 1);
      charDir = 3;
      lastGuiMove = millis();
    }
  } else if (xAxis < -threshold) {
    if (character && character.x > 0) {
      moveTo(character.x - 1, character.y);
      charDir = 2;
      lastGuiMove = millis();
    }
  } else if (xAxis > threshold) {
    if (character && map && character.x < map[0].length - 1) {
      moveTo(character.x + 1, character.y);
      charDir = 0;
      lastGuiMove = millis();
    }
  }

  if (gp.buttons[0].pressed) { // 'A' button
    reset();
    lastGuiMove = millis();
  }
}