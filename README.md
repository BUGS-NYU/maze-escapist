# Maze Escapists

### Task List
- intro screen for game???

- Level Selection improvement
    - right now, all we have is a select input to go to a new level
    - we can consider grouping levels into "Worlds" and develop a level selection UI in accordance
    - further details can be planned later

- reorganize lvls
- Arrow Keys: left/right keys causing level change error
    - replicate by selecting the level selection element first, press left/right
- Mobile Controls: double-tapping arrow default behavior error
- Mobile Controls: make buttons bigger
- add dev credits section in the html page

- Timer: have a timer countdown be displayed on the top-left corner of the game
    - Use text() function to display text on the p5 canvas
    - If the timer runs out before the player reaches the end, redirect to losing screen
- UI: add buttons for reset / continue
- Disable resetting during cannon animation
- Sewon: add item (bubble) to increase time when collected
- Sewon: add item (roundshot) to increase character's ammunition
- Sewon: move maps data to json file
- Sewon: add mortar obstacle
- Sewon: add bishop obstacle

- Sewon: create larger maps by displaying only 9x9 (or less) around the character + support for nonsquare maps???
- fix page freezing / audio cutout error
    - page is unable to reload (buffering forever) when this happens, audio is silent
    - replicate by triggering a lot of audios to be played for a long time, the gameplay will start to become laggy and audio will cut out
    - error is caused by many usages of sound.play()?
    - Observation: reducing mapSize resolves any lag issues, but audio cutout still happens suddenly