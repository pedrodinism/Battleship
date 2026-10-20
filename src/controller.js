import { Gameboard } from "./classes/gameboard.js";
import {
  closeGameOverDialog,
  openGameOverDialog,
  renderGameboard,
  renderGameOverDialog,
} from "./render.js";
import { Player } from "./classes/player.js";
import { addListeners } from "./ui.js";

let gameboardComputer = new Gameboard();
gameboardComputer.placeShipsRandomly();
let computer = new Player(false, gameboardComputer);

let gameboardPlayer = new Gameboard();
gameboardPlayer.placeShipsRandomly();
let player = new Player(true, gameboardPlayer);

let winner = null;

renderGameOverDialog();

export function startGame() {
  renderGameboard(computer);
  renderGameboard(player);
  addListeners();

  gameboardPlayer.attack();
  renderGameboard(player);
}

export function restartGame() {
  closeGameOverDialog();
  gameboardComputer = new Gameboard();
  gameboardComputer.placeShipsRandomly();
  computer = new Player(false, gameboardComputer);

  gameboardPlayer = new Gameboard();
  gameboardPlayer.placeShipsRandomly();
  player = new Player(true, gameboardPlayer);

  winner = null;
  startGame();
}

export function triggerAttack(cell) {
  if (winner) {
    return;
  }

  if (gameboardComputer.positions[cell].getIsHit()) {
    alert("position was already hitted;");
    return;
  }
  gameboardComputer.receiveAttack(cell);
  renderGameboard(computer);
  if (gameboardComputer.allShipsSunked()) {
    winner = true;
    openGameOverDialog("Player");
  }

  gameboardPlayer.attack();
  renderGameboard(player);
  if (gameboardPlayer.allShipsSunked()) {
    winner = true;
    openGameOverDialog("Computer");
  }
}
