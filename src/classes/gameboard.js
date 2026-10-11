class Gameboard {
  constructor() {
    this.positions = Array(100);
    this.#init();
  }

  ships() {
    return [5, 4, 3, 3, 2];
  }

  #init() {}

  #getRandomInt() {
    return Math.floor(Math.random() * 10) + 1;
  }

  #placeShip() {}
}
