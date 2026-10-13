export class Position {
  constructor() {
    this.isHit = false;
    this.ship = null;
  }

  updateShip(ship) {
    this.ship = ship;
  }

  hit() {
    this.hit = true;
  }

  hasShip() {
    return this.ship !== null;
  }
}
