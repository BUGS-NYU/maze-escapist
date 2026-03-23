/**
 * Saves level progress to localStorage.
 * @param {string} worldName - The name of the world (e.g., worlds[worldIndex].name)
 * @param {number} levelIndex - The index of the level just unlocked.
 */
function saveProgress(worldName, levelIndex) {
  const key = "progress";
  let currentProgress = JSON.parse(localStorage.getItem(key));

  // If progress not found, initialize default object with all worlds set to 0
  if (!currentProgress) {
    currentProgress = {};
    worlds.forEach(w => {
      currentProgress[w.name] = 0;
    });
  }

  // Update only if the new levelIndex is higher than the currently stored one
  if (levelIndex > (currentProgress[worldName] || 0)) {
    currentProgress[worldName] = levelIndex;
    localStorage.setItem(key, JSON.stringify(currentProgress));
  }

  // Update the global variable so the UI knows immediately
  progress = currentProgress;
  renderLevelButtons(); 
}

/**
 * Retrieves the current progress from localStorage.
 * If no progress exists, returns a default object with all worlds set to 0.
 */
function getProgress() {
  const key = "progress";
  const saved = localStorage.getItem(key);
  
  if (saved) {
    return JSON.parse(saved);
  }

  const defaultProgress = {};
  if (worlds) {
    worlds.forEach(w => {
      defaultProgress[w.name] = 0;
    });
  }
  return defaultProgress;
}