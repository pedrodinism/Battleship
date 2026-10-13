import { Ship } from "./ship";

export class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
  }

  isSunk() {
    return this.hits === this.length;
  }

  hit() {
    if (this.hits < this.length) {
      this.hits++;
    }
  }
}
