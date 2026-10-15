import { Gameboard } from "./classes/gameboard.js";
import { renderGameboard } from "./render.js";
import { Player } from "./classes/player.js";
import "./style.css";

const gameboardComputer = new Gameboard();
gameboardComputer.placeShipsRandomly();
const computer = new Player(false, gameboardComputer);

const gameboardPlayer = new Gameboard();
gameboardPlayer.placeShipsRandomly();
const player = new Player(true, gameboardPlayer);

renderGameboard(computer);
renderGameboard(player);

gameboardPlayer.receiveRandomAttack();
renderGameboard(player);
