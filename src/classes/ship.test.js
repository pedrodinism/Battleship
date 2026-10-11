import { Ship } from "./ship";

test("setup", () => {
  const ship = new Ship(3);
  expect(ship.length).toBe(3);
});

test("hit", () => {
  const ship = new Ship(3);
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.hits).toBe(3);
});

test("is sunk", () => {
  const ship = new Ship(3);
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});
