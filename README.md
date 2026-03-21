# Maze Escapists

### Task List
- add all current data to top header bar
- Nuke spawnkilling level
- breakable rock intro level
- breakable rock wise usage maze
- breakable rock protecting exit cannon
- breakable rock cave: shortest path algorithm
- breakable rock cluster + lasers, only 1 hammer must use at end
- breakable rock + knight + cannon complex
- moving train (random start & direction)
- armed train
- buyable items (session)
- reset progress
- rotating cannon (random start orientation)
- New maze stylings (themes unlocked)
- worlds: groupings of lvls
- level unlocking by session
- add to bugs website
- marketing 1
- ai generated lvls
- Levels 18 and later: progressive darkness

- Dark Levels: camera item, candle item, night vision item
- Fire block
- No light lvl deduce by sound

- add bishop obstacle

- add mortar obstacle


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