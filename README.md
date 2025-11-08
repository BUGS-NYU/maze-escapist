# Maze Escapists

### Task List
- Sound effect to play every time the character moves
    - Pick the audio on your own discretion
    - Load the audio in preload(), use audio.play()
    - Everytime the user presses WASD..., play this audio
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
- Sewon: deploy current game to web
- Sewon: create new knight obstacle standing (2, 1) blocks away from knight leads to death
- Sewon: change the design of the empty / wall blocks, such that they are rendered with images