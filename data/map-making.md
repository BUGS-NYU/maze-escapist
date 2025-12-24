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

To create a new level, add a new object as an element to maps.json, this object must have a property "map" with the 2-dimensional grid for the level. There must be the same number of rows as columns. Next, edit index.html to have another level to available to be selected.