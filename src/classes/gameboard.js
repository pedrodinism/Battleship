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
      const position = new Position();
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

  #getPositions(length, initialIndex, direction) {
    const indexes = [initialIndex];
    let counter = 1;
    while (counter < length) {
      const index = initialIndex + counter * direction;
      indexes.push(index);
      counter++;
    }
    if (this.isValidPosition(indexes)) {
      return indexes;
    }
  }

  isValidPosition(array) {
    let yPosition = [];
    let xPosition = [];
    for (const value of array) {
      if (value < 0 || value > 99) {
        return false;
      }
      if (this.positions[value].hasShip()) {
        return false;
      }
      xPosition.push(value % 10);
      yPosition.push(Math.floor(value / 10));
    }
    const sameY = yPosition.every((val) => val === yPosition[0]);
    const sameX = xPosition.every((val) => val === xPosition[0]);
    return sameY || sameX;
  }

  placeShip(ship, positions = null) {
    if (!positions) {
      positions = this.getRandomPosition(ship.length);
    } else {
      if (!this.isValidPosition(positions)) {
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
    let isFound = false;
    let positionIndex = this.#getRandomInt(0, 99);
    let positionCounter = 0;
    let positions = [];

    while (isFound === false && positionCounter < 100) {
      const initialPosition = this.positions[positionIndex % 100];
      if (initialPosition.hasShip()) {
        positionIndex++; //if position is taken, get next one
        positionCounter++;
        continue;
      }
      let directionIndex = this.#getRandomInt(0, 3);
      let directionCounter = 0;
      while (directionCounter < 4 && isFound === false) {
        const direction = this.directions[directionIndex % 4];
        positions = this.#getPositions(length, positionIndex, direction);
        if (positions) {
          isFound = true;
          continue;
        }
        directionIndex++;
        directionCounter++;
      }
      positionIndex++;
      positionCounter++;
    }

    return positions;
  }

  receiveAttack(index) {
    const position = this.positions[index];
    if (position.getIsHit()) {
      throw Error("Square is already hit");
    }
    position.hit();
  }

  allShipsSunked() {
    for (const ship of this.ships) {
      if (!ship.isSunk()) {
        return false;
      }
    }
    return true;
  }
}
