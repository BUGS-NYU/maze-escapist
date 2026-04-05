- " " = empty space
- "W" = wall
- "L" = laser
- "E" = end block
- "K" = knight
- "1" = cannon up
- "2" = cannon down
- "3" = cannon left
- "4" = cannon right
- "9" = random block (add two of them to map, only 1 will exist)
- "0" = random block (duplicate)
- "-" = random block (duplicate)
- "N" = nuke
- "A" = activated nuke
- "B" = bubble
- "H" = hammer
- "X" = bishop
- "5" = teleporter up
- "6" = teleporter down
- "7" = teleporter left
- "8" = teleporter right

To create a new level, add a new object as an element to maps.json, this object must have a property "map" with the 2-dimensional grid for the level. There must be the same number of rows as columns. Next, edit index.html to have another level to available to be selected.

### Requirements
Each level must be formatted as a 2-dimensional array, where there is an equal number of rows and columns (example below).

[
    [" ", " ", " "]
    [" ", " ", " "]
    [" ", " ", " "]
]

The character will always start at coordinate (0, 0). This means that (0, 0) must be empty such that the character can spawn.

### End Block (E)
This block is the end of the map. The character must reach it to win.

### Laser (L)
Flickers on and off, character can pass through it if timed correctly

### Knight (K)
The knight attacks all squares 2x1 from itself, just like the chess piece. Moving the character into its attacked squares leads to instant death.

### Cannon (1, 2, 3, 4)
The cannon can be facing one of four dimensions (1=up, 2=down, 3=left, 4=right). Going anywhere in front of the cannon (in its straight path) leads to death.

### Nuke (N)
The nuke activates when character is adjacent to it. It will then detonate within 3-5 seconds meaning the character must reach the exit before its detonation.

### Bishop (X)
Bishop attacks all squares diagonal to it. It's range is infinite.