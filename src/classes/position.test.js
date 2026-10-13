import { Position } from "./position";
import { Ship } from "./ship";

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
