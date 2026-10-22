import { Ship } from "./ship.js";
import { Position } from "./position.js";

export class Gameboard {
  constructor() {
    this.positions = Array(100);
    this.directions = [1, -1, 10, -10]; // 1: 1 position to the right, -1: 1 position to the left, 10: 1 position below, -10: 1 position top
    this.ships = [];
    this.init();
  }

  getShips() {
    return [5, 4, 3, 3, 2];
  }

  init() {
    let i = 0;
    while (i < 100) {
      const position = new Position(i);
      this.positions[i] = position;
      i++;
    }
    return true;
  }

  getPositions() {
    return this.positions;
  }

  placeShipsRandomly() {
    for (const value of this.getShips()) {
      const ship = new Ship(value);
      this.placeShip(ship);
    }
    return true;
  }

  #getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  #getPossiblePositions(length, initialIndex, direction) {
    const indexes = [initialIndex];
    let counter = 1;
    while (counter < length) {
      const index = initialIndex + counter * direction;
      indexes.push(index);
      counter++;
    }
    if (this.isValidArea(indexes)) {
      return indexes;
    }
  }

  isValidArea(array, validateShips = true) {
    let yPosition = [];
    let xPosition = [];
    for (const value of array) {
      if (!this.isValidPosition(value, validateShips)) {
        return false;
      }
      xPosition.push(value % 10);
      yPosition.push(Math.floor(value / 10));
    }
    const sameY = yPosition.every((val) => val === yPosition[0]);
    const sameX = xPosition.every((val) => val === xPosition[0]);
    if (!sameY && !sameX) {
      return false;
    }
    const neighbours = this.getNeighbours(array);
    for (const neighbour of neighbours) {
      if (!this.isValidPosition(neighbour, validateShips)) {
        return false;
      }
    }
    return true;
  }

  isValidPosition(position, validateShips = true) {
    if (position < 0 || position > 99) {
      return false;
    }
    if (validateShips && this.positions[position].hasShip()) {
      return false;
    }
    return true;
  }

  getNeighbours(array, isGetOblique = true) {
    const neighbours = [];
    const vectors = [-10, -1, 1, 10];
    if (isGetOblique) {
      vectors.push(...[-11, -9, 9, 11]);
    }

    for (const position of array) {
      for (const vector of vectors) {
        const neighbour = vector + position;
        if (!this.isValidPosition(neighbour, false)) {
          continue;
        }
        const xPosition = position % 10;
        const yPosition = Math.floor(position / 10);
        const xNeighbour = neighbour % 10;
        const yNeighbour = Math.floor(neighbour / 10);

        const xDelta = Math.abs(xPosition - xNeighbour);
        const yDelta = Math.abs(yPosition - yNeighbour);

        if (
          xDelta < 2 &&
          yDelta < 2 &&
          !neighbours.includes(neighbour) &&
          !array.includes(neighbour)
        ) {
          neighbours.push(neighbour);
        }
      }
    }
    return neighbours;
  }

  placeShip(ship, positions = null) {
    if (!positions) {
      positions = this.getRandomPosition(ship.length);
    } else {
      if (!this.isValidArea(positions)) {
        throw Error("invalid position");
      }
    }

    for (const position of positions) {
      this.positions[position].updateShip(ship);
    }
    this.ships.push(ship);
    return positions;
  }

  getRandomPosition(length) {
    let possiblePositions = [];
    const positions = this.shuffleArray(this.positions);
    for (const position of positions) {
      if (position.hasShip()) {
        continue;
      }
      const directions = this.shuffleArray(this.directions);
      for (const direction of directions) {
        possiblePositions = this.#getPossiblePositions(
          length,
          position.index,
          direction,
        );
        if (possiblePositions) {
          return possiblePositions;
        }
      }
    }
  }

  receiveAttack(index) {
    const position = this.positions[index];
    if (!position) {
      throw Error("Position not found for index " + index);
    }
    if (position.getIsHit()) {
      throw Error("Square is already hit");
    }
    position.hit();
    return true;
  }

  attack() {
    const targetAttack = this.getNextAttack();
    if (targetAttack) {
      return this.receiveAttack(targetAttack);
    }
    let counter = 0;
    let index = this.#getRandomInt(0, 99);
    let isFound = false;
    while (!isFound && counter < 100) {
      if (this.positions[index % 100].getIsHit()) {
        counter++;
        index++;
        continue;
      }
      isFound = true;
      return this.receiveAttack(index % 100);
    }
  }

  getNextAttackOLD() {
    let index = 0;
    for (const position of this.positions) {
      if (position.getIsHit() && position.hasShip()) {
        const targets = [...this.directions].map(
          (direction) => direction + index,
        );
        for (const target of targets) {
          if (
            this.isValidArea([index, target], false) &&
            !this.positions[target].getIsHit()
          ) {
            return target;
          }
        }
      }
      index++;
    }
  }

  getNextAttack() {
    for (const position of this.positions) {
      if (!position.getIsHit() || !position.hasShip()) {
        continue;
      }
      const neighbours = this.getNeighbours([position.index]);
      const neighboursHit = neighbours.filter(
        (index) =>
          this.positions[index].getIsHit() && this.positions[index].hasShip(),
      );
      const neighboursHitLength = neighboursHit.length;

      switch (neighboursHitLength) {
        case 2:
          continue;
        case 1:
          const nextAttack = 2 * position.index - neighboursHit; //neighbours h
          if (
            this.isValidArea([position.index, nextAttack], false) &&
            !this.positions[nextAttack].getIsHit()
          ) {
            return nextAttack;
          }
          continue;
        case 0:
          const targets = [...this.directions].map(
            (direction) => direction + position.index,
          );
          for (const target of targets) {
            if (
              this.isValidArea([position.index, target], false) &&
              !this.positions[target].getIsHit()
            ) {
              return target;
            }
          }
      }
    }
  }

  allShipsSunked() {
    for (const ship of this.ships) {
      if (!ship.isSunk()) {
        return false;
      }
    }
    return true;
  }

  shuffleArray(array) {
    const length = array.length;
    const newArray = [];
    let index = this.#getRandomInt(0, length - 1);
    let counter = 0;
    while (counter < length) {
      newArray.push(array[index % length]);
      index++;
      counter++;
    }
    return newArray;
  }
}
