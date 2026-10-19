import { Gameboard } from "./classes/gameboard.js";
import { openGameOverDialog, renderGameboard } from "./render.js";
import { Player } from "./classes/player.js";

let gameboardComputer = new Gameboard();
gameboardComputer.placeShipsRandomly();
let computer = new Player(false, gameboardComputer);

let gameboardPlayer = new Gameboard();
gameboardPlayer.placeShipsRandomly();
let player = new Player(true, gameboardPlayer);

let winner = null;

export function startGame() {
  renderGameboard(computer);
  renderGameboard(player);

  gameboardPlayer.receiveRandomAttack();
  renderGameboard(player);
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

  gameboardPlayer.receiveRandomAttack();
  renderGameboard(player);
  if (gameboardPlayer.allShipsSunked()) {
    winner = true;
    openGameOverDialog("Computer");
  }
}
