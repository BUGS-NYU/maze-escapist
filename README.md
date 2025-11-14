# Maze Escapists

### Task List
- David - Timer: have a timer countdown be displayed on the top-left corner of the game
    - Use text() function to display text on the p5 canvas
    - If the timer runs out before the player reaches the end, redirect to losing screen
- Sound effect to play every time the character dies from laser
    - Pick the audio on your own discretion
    - Load the audio in preload(), use audio.play()
    - Everytime character hits laser, play this audio
- Mobile Accessibility: for mobile players, we could add Up/Down/Left/Right buttons somehow for character control?
    - we could make these buttons in the HTML UI
    - create event listeners for buttons click within window.addEventListener("DOMContentLoaded") { ... }
- Create level8
    - use a combination of knight & laser to create dynamic gameplay
    - play test it, ensure it is playable
- Fix knight-related bug
    - eating a knight in lvl4, then switching to a diff level and going back to lvl4 causes this bug
    - the knight will no longer exist as a result
- Improve appearance of end block
    - right now end block is a purple square
    - rendering a door/gate image onto the end block should make it more intuitive for players
- Level Selection improvement
    - right now, all we have is a select input to go to a new level
    - we can consider grouping levels into "Worlds" and develop a level selection UI in accordance
    - further details can be planned later

- Alex: Intro screen for game
    - Minimally, we could have an simple instruction and a (start) button for this.
- Sewon: add lvl6 w new knight ideas, add small lvl7 with mass laser idea
- Sewon: create larger maps by displaying only 9x9 (or less) around the character
- Sewon: move all knight-related code/logic to diff js file
- Sewon: add lighting system in proximity distance w character
- Sewon: levels must be unlocked by completion of its previous (store persistent data in localstorage)
- Sewon: add item to increase time when collected
- Sewon: add cannon obstacle