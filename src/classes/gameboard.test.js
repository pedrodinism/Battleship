import { Gameboard } from "./gameboard";
import { Ship } from "./ship";

test("setup", () => {
  const gameboard = new Gameboard();
  expect(gameboard.directions[3]).toBe(-10);
});

test("is valid area", () => {
  const gameboard = new Gameboard();
  const tests = [
    { input: [7, 8, 9, 10, 11], output: false },
    { input: [5, 6, 7, 8, 9], output: true },
    { input: [0, 10, 20, 30, 40], output: true },
    { input: [-10, 0, 10, 20, 30, 40], output: false },
    { input: [0, 1, 2, 3, 4], output: true },
  ];
  tests.forEach((element) => {
    expect(gameboard.isValidArea(element.input)).toBe(element.output);
  });
});

test("get random position", () => {
  const gameboard = new Gameboard();
  const positions = gameboard.getRandomPosition(2);
  expect(positions.length).toBe(2);
});

test("place ship, with position and randomly", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(5);
  const position = [0, 1, 2, 3, 4];
  gameboard.placeShip(ship, position);
  expect(gameboard.ships.length).toBe(1);
  const ship2 = new Ship(2);
  gameboard.placeShip(ship2);
  expect(gameboard.ships.length).toBe(2);
  const placeSamePosition = () => {
    gameboard.placeShip(ship, position);
  };
  expect(placeSamePosition).toThrow();
});

test("place ships randomly", () => {
  const gameboard = new Gameboard();
  expect(gameboard.placeShipsRandomly()).toBe(true);
});

test("receive attack", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(2);
  const position = [0, 1];
  gameboard.placeShip(ship, position);
  gameboard.receiveAttack(0);
  expect(ship.isSunk()).toBe(false);
  expect(gameboard.allShipsSunked()).toBe(false);
  gameboard.receiveAttack(1);
  expect(ship.isSunk()).toBe(true);
  expect(gameboard.allShipsSunked()).toBe(true);
});

test("neighbours", () => {
  const gameboard = new Gameboard();
  const tests = [
    { input: [0], output: [1, 10, 11] },
    { input: [99], output: [89, 98, 88] },
    { input: [55], output: [45, 54, 56, 65, 44, 46, 64, 66] },
    { input: [0, 1], output: [10, 11, 2, 12] },
    { input: [1, 11, 21], output: [0, 2, 10, 12, 20, 22, 31, 30, 32] },
    {
      input: [11, 21, 31],
      output: [0, 1, 2, 10, 12, 20, 22, 30, 32, 40, 41, 42],
    },
  ];
  tests.forEach((element) => {
    expect(gameboard.getNeighbours(element.input).sort()).toEqual(
      element.output.sort(),
    );
  });
});

test("GetNextAttack happy flow", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(3);
  const position = [0, 1, 2];
  gameboard.placeShip(ship, position);
  gameboard.receiveAttack(0);
  gameboard.receiveAttack(1);
  expect(gameboard.getNextAttack()).toBe(2);
});

test("GetNextAttack return undefined", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(3);
  const position = [0, 1, 2];
  gameboard.placeShip(ship, position);
  gameboard.receiveAttack(0);
  gameboard.receiveAttack(1);
  gameboard.receiveAttack(2);
  gameboard.receiveAttack(3);
  expect(gameboard.getNextAttack()).toBe(undefined);
});

test("GetNextAttack return undefined 2", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(2);
  const position = [8, 9];
  gameboard.placeShip(ship, position);
  gameboard.receiveAttack(8);
  gameboard.receiveAttack(9);
  gameboard.receiveAttack(7);
  gameboard.receiveAttack(19);
  gameboard.receiveAttack(18);
  expect(gameboard.getNextAttack()).toBe(undefined);
});

test("GetNextAttack vertical", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(3);
  const position = [1, 11, 21];
  gameboard.placeShip(ship, position);
  gameboard.receiveAttack(1);
  gameboard.receiveAttack(0);
  gameboard.receiveAttack(2);
  expect(gameboard.getNextAttack()).toBe(11);
});
