Thought about creating a structure for each position with top, bottom, right and left.

That way I could move quickly.

Decided to "transform" coordinates into indexes: ex: 0 -> [1,1]; 1 -> [1,2], etc... Then look it up also is O(1)

LEFT TO DO

- Add neighbours to array and validate them as well
    - there is an error after searching position 99
- Add a nicer UI
    - add animation when game ends and option to start over
- Add 'intelligence' - if there is a position hit, try the neighbours next
- Review code, check if it can be improved