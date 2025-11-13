# Maze Escapists

### Task List
- Timer: have a timer countdown be displayed on the top-left corner of the game
    - Use text() function to display text on the p5 canvas
    - If the timer runs out before the player reaches the end, redirect to losing screen
- Sound effect to play every time the character dies from laser
    - Pick the audio on your own discretion
    - Load the audio in preload(), use audio.play()
    - Everytime character hits laser, play this audio
- Mobile Accessibility: for mobile players, we could add Up/Down/Left/Right buttons somehow for character control?
    - we could make these buttons in the HTML UI
    - create event listeners for buttons click within window.addEventListener("DOMContentLoaded") { ... }

- Alex: Intro screen for game
    - Minimally, we could have an simple instruction and a (start) button for this.
- Sewon: create larger maps by displaying only 9x9 (or less) around the character
- Sewon: levels must be unlocked by completion of its previous (store persistent data in localstorage)
- Sewon: create new knight in wall obstacle which cannot be killed by character, regular knight can be killed by character
    - Revise level4 to display this concept
- Sewon: create level 5 to reflect knight blocking correct path, different path needed to eliminate the knight