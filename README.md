# Maze Escapists

### Task List
- Nuke Block: explode on adjacency, cannot walk thru
    - multi nuke activation case: how to handle multi audio
    - On Explosion: already ended case, ensure no death/sounds triggered maybe use callback?
- Levels 10 and later: progressive darkness

- Dark Levels: camera item, candle item, night vision item
- Fire block
- No light lvl deduce by sound


- add item (bubble) to increase time when collected
- add item (roundshot) to increase character's ammunition
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