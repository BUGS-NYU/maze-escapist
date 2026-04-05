# Maze Escapists
# [Play Here!](https://bugsnyu.com/maze-escapist/)

### Task List
- ocean: knight army + bubble + rocks

- more usages of bubble & random block

- imgs: optimize all to 128?

- bullet world: create new theme
- teleporter functionality
- teleporter audio
- teleporter stacking logic
- teleporter stacking tests
- super-fast pill: hold WASD determines how far char goes, char will have a black/white trail
- teleporter demo
- teleporter stacking paths, very fast timer
- teleporter in maze: teleport into lock
- teleporter paths with obstacles between
- teleporter + cannon-only maze: teleport into cannon cycle, teleport across cannon
- teleporter based maze w knights: very fast timer

- add nyc world:
- moving train (random start & direction)
- armed train (must be animated?)
- rotating cannon (random start orientation)
- moving mouse: shortest path route to player

- look into mobile lag issue

- add winter world + theme (very large levels)
- add mortar obstacle
- add freezing: limits character speed

- buyable items (session)
- reset progress button

- add to bugs website
- marketing 1

- overall difficulty & time tweaks

- Dark world of levels
- Dark Levels: camera item, candle item, night vision item
- Fire block
- No light lvl deduce by sound

### Errors
- Image doesnt have transparent bg error: use a .png that seems to have no checkers (during google search view)
- old version of sketch.js fetched: therefore sketch.js edits dont register
    - hard reload doesn't work
    - Solution: changing sketch.js filename will force new fetch

- fix page freezing / audio cutout error
    - page is unable to reload (buffering forever) when this happens, audio is silent
    - replicate by triggering a lot of audios to be played for a long time, the gameplay will start to become laggy and audio will cut out
    - error is caused by many usages of sound.play()?
    - Observation: reducing mapSize resolves any lag issues, but audio cutout still happens suddenly