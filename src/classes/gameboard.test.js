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

test("get next attack happy flow", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(2);
  const position = [0, 1];
  gameboard.placeShip(ship, position);
  gameboard.receiveAttack(0);
  expect(gameboard.getNextAttack()).toBe(1);
});

test("get next attack unhappy flow", () => {
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

test("neighbours", () => {
  const gameboard = new Gameboard();
  const tests = [
    { input: [0], output: [1, 10, 11] },
    { input: [99], output: [89, 98, 88] },
    { input: [55], output: [45, 54, 56, 65, 44, 46, 64, 66] },
    { input: [0, 1], output: [10, 11, 2, 12] },
  ];
  tests.forEach((element) => {
    expect(gameboard.getNeighbours(element.input)).toEqual(element.output);
  });
});
