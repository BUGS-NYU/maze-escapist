// level selector ui: on change, set new level
window.addEventListener("DOMContentLoaded", () => {
  // Prevent default scrolling for arrow keys
  document.addEventListener("keydown", function (event) {
    // Check for arrow keys
    if (
      event.key === "ArrowUp" ||
      event.key === "ArrowDown" ||
      event.key === "ArrowLeft" ||
      event.key === "ArrowRight"
    ) {
      event.preventDefault(); // Stop the default scroll behavior
    }
  });

  // Mobile controls: add event listeners for directional buttons
  const btnUp = document.getElementById("btn-up");
  const btnDown = document.getElementById("btn-down");
  const btnLeft = document.getElementById("btn-left");
  const btnRight = document.getElementById("btn-right");
  const btnReset = document.getElementById("btn-reset");
  const btnContinue = document.getElementById("btn-continue");

  btnUp.addEventListener("click", () => {
    if (character && character.y > 0) {
      moveTo(character.x, character.y - 1);
      charDir = 1;
    }
  });

  btnDown.addEventListener("click", () => {
    if (character && map && character.y < map.length - 1) {
      moveTo(character.x, character.y + 1);
      charDir = 3;
    }
  });

  btnLeft.addEventListener("click", () => {
    if (character && character.x > 0) {
      moveTo(character.x - 1, character.y);
      charDir = 0;
    }
  });

  btnRight.addEventListener("click", () => {
    if (character && map && map[0] && character.x < map[0].length - 1) {
      moveTo(character.x + 1, character.y);
      charDir = 2;
    }
  });

  btnReset.addEventListener("click", () => {
    reset();
  });

  btnContinue.addEventListener("click", () => {
    if (gameState === "win") {
      changeLevel(mapIndex + 1);
    }
  });

  // Swipe detection for touch and mouse/trackpad
  let touchStartX = null;
  let touchStartY = null;
  let mouseStartX = null;
  let mouseStartY = null;
  let isMouseDown = false;
  const minSwipeDistance = 30; // Minimum distance in pixels to register a swipe

  function handleSwipe(startX, startY, endX, endY) {
    const deltaX = endX - startX;
    const deltaY = endY - startY;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    // Check if swipe is significant enough
    if (absDeltaX < minSwipeDistance && absDeltaY < minSwipeDistance) {
      return;
    }

    // Determine swipe direction (prioritize the larger movement)
    if (absDeltaX > absDeltaY) {
      // Horizontal swipe
      if (deltaX > 0) {
        // Swipe right
        if (character && map && map[0] && character.x < map[0].length - 1) {
          moveTo(character.x + 1, character.y);
          charDir = 2;
        }
      } else {
        // Swipe left
        if (character && character.x > 0) {
          moveTo(character.x - 1, character.y);
          charDir = 0;
        }
      }
    } else {
      // Vertical swipe
      if (deltaY > 0) {
        // Swipe down
        if (character && map && character.y < map.length - 1) {
          moveTo(character.x, character.y + 1);
          charDir = 3;
        }
      } else {
        // Swipe up
        if (character && character.y > 0) {
          moveTo(character.x, character.y - 1);
          charDir = 1;
        }
      }
    }
  }

  // Wait for canvas to be created, then add swipe listeners
  function addSwipeListeners() {
    const canvas = document.querySelector("canvas");
    if (!canvas) {
      // Canvas not ready yet, try again
      setTimeout(addSwipeListeners, 100);
      return;
    }

    // Touch events for mobile
    canvas.addEventListener("touchstart", (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
    });

    canvas.addEventListener("touchend", (e) => {
      e.preventDefault();
      if (touchStartX === null || touchStartY === null) return;

      const touch = e.changedTouches[0];
      handleSwipe(touchStartX, touchStartY, touch.clientX, touch.clientY);
      touchStartX = null;
      touchStartY = null;
    });

    // Mouse/trackpad events for desktop
    canvas.addEventListener("mousedown", (e) => {
      isMouseDown = true;
      mouseStartX = e.clientX;
      mouseStartY = e.clientY;
    });

    canvas.addEventListener("mousemove", (e) => {
      if (!isMouseDown) return;
      // Don't handle during move, wait for mouseup
    });

    canvas.addEventListener("mouseup", (e) => {
      if (!isMouseDown) return;
      if (mouseStartX === null || mouseStartY === null) return;

      handleSwipe(mouseStartX, mouseStartY, e.clientX, e.clientY);
      isMouseDown = false;
      mouseStartX = null;
      mouseStartY = null;
    });

    // Handle mouse leaving canvas while dragging
    canvas.addEventListener("mouseleave", () => {
      isMouseDown = false;
      mouseStartX = null;
      mouseStartY = null;
    });
  }

  // Start trying to add swipe listeners
  addSwipeListeners();

  // change level modal
  const changeButton = document.getElementById("change-level");
  const changeModal = document.getElementById("change-level-modal");

  // dynamically generate level buttons once maps are available
  const generateLevelButtons = () => {
    if (!maps) {
      setTimeout(generateLevelButtons, 100); // Wait for loadJSON to finish
      return;
    }

    // Clear any existing hardcoded buttons
    changeModal.innerHTML = "";

    // Create a button for every entry in the maps array
    maps.forEach((mapData, index) => {
      const btn = document.createElement("button");
      btn.value = index;
      btn.innerText = `Level ${index + 1}`;
      btn.addEventListener("click", () => {
        changeLevel(index);
        changeModal.style.display = "none";
      });
      changeModal.appendChild(btn);
    });
  };
  generateLevelButtons();

  // change button click: toggle modal show
  changeButton.addEventListener("click", () => {
    if (changeModal.style.display === "none") {
      changeModal.style.display = "grid";
    } else if (changeModal.style.display === "grid") {
      changeModal.style.display = "none";
    }
  });

  // level button click: change level & close modal
  const levelButtons = changeModal.querySelectorAll("button");
  levelButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedLevel = button.value;
      changeLevel(parseInt(selectedLevel));
      changeModal.style.display = "none";
    });
  });
});

// Global references for UI elements
let timeDisplay = null;
let levelDisplay = null;
let hammerDisplay = null;

/**
 * Updates the level shown in the HTML UI
 */
function updateLevelUI(newLevel) {
  if (levelDisplay) {
    levelDisplay.innerText = newLevel;
  }
}

/**
 * Updates the hammer count shown in the HTML UI
 */
function updateHammerUI(count) {
  if (hammerDisplay) {
    hammerDisplay.innerText = count;
  }
}

/**
 * Updates the time shown in the HTML UI
 * @param {number|string} newTime 
 */
function updateTimeUI(newTime) {
  if (timeDisplay) {
    timeDisplay.innerText = newTime;
  }
}

window.addEventListener("DOMContentLoaded", () => {
  // Initialize global references
  timeDisplay = document.getElementById("ui-time");
  levelDisplay = document.getElementById("ui-level");
  hammerDisplay = document.getElementById("ui-hammers");
});