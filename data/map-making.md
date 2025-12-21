- ' ' = empty space
- W = wall
- L = laser
- E = end block
- K = knight
- D = dead knight
- 1 = cannon up
- 2 = cannon down
- 3 = cannon left
- 4 = cannon right
- 5 = dead cannon up
- 6 = dead cannon down
- 7 = dead cannon left
- 8 = dead cannon right

To create a new level, add a new object as an element to maps.json, this object must have a property "map" with the 2-dimensional grid for the level. There must be the same number of rows as columns. Next, edit index.html to have another level to available to be selected.