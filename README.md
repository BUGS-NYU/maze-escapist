# Maze Escapists

### Task List
- David - Timer: have a timer countdown be displayed on the top-left corner of the game
    - Use text() function to display text on the p5 canvas
    - If the timer runs out before the player reaches the end, redirect to losing screen
- Pope - Sound effect to play every time the character dies from laser
    - Pick the audio on your own discretion
    - Load the audio in preload(), use audio.play()
    - Everytime character hits laser, play this audio
- Coco - Mobile Accessibility: for mobile players, we could add Up/Down/Left/Right buttons somehow for character control?
    - we could make these buttons in the HTML UI
    - create event listeners for buttons click within window.addEventListener("DOMContentLoaded") { ... }
- Ele - Improve appearance of end block
    - right now end block is a purple square
    - rendering a door/gate image onto the end block should make it more intuitive for players
- Alex: Intro screen for game
    - Minimally, we could have an simple instruction and a (start) button for this.

- Level Selection improvement
    - right now, all we have is a select input to go to a new level
    - we can consider grouping levels into "Worlds" and develop a level selection UI in accordance
    - further details can be planned later
- Knight Movement Indicator
    - when character dies from knight, indicate the squares in which the knight is able to attack
    - with red shade
- levels must be unlocked by completion of its previous (store persistent data in localstorage)

- Sewon: add item (bubble) to increase time when collected
- Sewon: add item (roundshot) to increase character's ammunition
- Sewon: move maps data to json file
- Sewon: add more levels
    submerged lvl w knight/cannon
    constant + pattern level
    cannon/knight chain of protection & exit is at start
    knight wall pattern & secret opening, diversions
    lvl11
- team made world 2 w new graphics
- Sewon: colored gates & key system
- Sewon: add mortar obstacle
- Sewon: create larger maps by displaying only 9x9 (or less) around the character + support for nonsquare maps