import { Gameboard } from "./classes/gameboard.js";
import { renderGameboard } from "./render.js";

const gameboard = new Gameboard();
gameboard.placeShipsRandomly();

renderGameboard(gameboard);
