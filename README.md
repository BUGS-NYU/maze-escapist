# Maze Escapists
# [Play Here!](https://bugsnyu.com/maze-escapist/)

### Task List
- breakable rock protected by others
- laser flooded cave, breakable blocks as breaks (1 less hammer)
- filled cave: unoptimal hammers, optimal hammers
- cave: nuke + 1 hammer + rock maze

- ocean: knight army + bubble + rocks

- more usages of bubble & random block

- fast world
- teleporter

- add nyc world:
- moving train (random start & direction)
- armed train (must be animated?)
- rotating cannon (random start orientation)
- moving mouse: shortest path route to player

- add winter world + theme
- add mortar obstacle

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