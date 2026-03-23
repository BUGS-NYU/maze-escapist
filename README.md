# Maze Escapists

### Task List
- add game link to readme
- html top bar: fix oversize bug
- html top bar: mobile responsive design

- create nuclear factory world
- Nuke spawnkilling level

- create new rocky mountain world
- breakable rock 2 rocks vs 1 hammer situation
- breakable rock wise usage maze
- breakable rock protecting exit cannon
- breakable rock cave: shortest path algorithm
- breakable rock cluster + lasers, only 1 hammer must use at end
- breakable rock + knight + cannon complex
- more usages of bubble & random block

- add bishop obstacle
- add mortar obstacle

- moving train (random start & direction)
- armed train
- buyable items (session)
- reset progress
- rotating cannon (random start orientation)

- add to bugs website
- marketing 1
- ai generated lvls

- Dark world of levels
- Dark Levels: camera item, candle item, night vision item
- Fire block
- No light lvl deduce by sound


- create larger maps by displaying only 9x9 (or less) around the character + support for nonsquare maps???
- fix page freezing / audio cutout error
    - page is unable to reload (buffering forever) when this happens, audio is silent
    - replicate by triggering a lot of audios to be played for a long time, the gameplay will start to become laggy and audio will cut out
    - error is caused by many usages of sound.play()?
    - Observation: reducing mapSize resolves any lag issues, but audio cutout still happens suddenly

- TD idea (world 3)
    - use current levels rendering system & logic
    - add more building / fighting mechanics, space as a control

### Errors
- Image doesnt have transparent bg error: use a .png that seems to have no checkers (during google search view)