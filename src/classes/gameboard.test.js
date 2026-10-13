import { Gameboard } from "./gameboard";
import { Ship } from "./ship";

test("setup", () => {
  const gameboard = new Gameboard();
  expect(gameboard.directions[3]).toBe(-10);
});
