export class Position {
  constructor() {
    this.isHit = false;
    this.ship = null;
  }

  updateShip(ship) {
    this.ship = ship;
  }

  hit() {
    this.isHit = true;
    if (this.hasShip()) {
      this.ship.hit();
    }
  }

  getIsHit() {
    return this.isHit;
  }

  hasShip() {
    return this.ship !== null;
  }
}
