Thought about creating a structure for each position with top, bottom, right and left that would link to the neighbour.

That way I could move quickly.

Decided to "transform" coordinates into indexes: ex: 0 -> [1,1]; 1 -> [1,2], etc... Then look it up also is O(1)

LEFT TO DO

- Review code, check if it can be improved