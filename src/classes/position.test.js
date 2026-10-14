import { Position } from "./position.js";
import { Ship } from "./ship.js";

test("ship", () => {
  const position = new Position();
  const ship = new Ship();
  position.updateShip(ship);
  expect(position.hasShip()).toBe(true);
});

test("hit", () => {
  const position = new Position();
  position.hit();
  expect(position.getIsHit()).toBe(true);
});
