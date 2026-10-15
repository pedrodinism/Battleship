import { Gameboard } from "./classes/gameboard.js";
import { renderGameboard } from "./render.js";
import { Player } from "./classes/player.js";

const gameboardComputer = new Gameboard();
gameboardComputer.placeShipsRandomly();
const computer = new Player(false, gameboardComputer);

const gameboardPlayer = new Gameboard();
gameboardPlayer.placeShipsRandomly();
const player = new Player(true, gameboardPlayer);

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
    alert("You won!");
  }

  gameboardPlayer.receiveRandomAttack();
  renderGameboard(player);
  if (gameboardPlayer.allShipsSunked()) {
    winner = true;
    alert("Computer won!");
  }
}
