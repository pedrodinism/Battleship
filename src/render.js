export function renderGameboard(player) {
  const gameboard = player.gameboard;
  if (!gameboard) {
    return;
  }

  const body = document.querySelector("body");

  let id = "";
  let label = "";
  let isHuman = player.isHuman;
  if (isHuman) {
    id = "player-human";
    label = "Player";
  } else {
    id = "player-computer";
    label = "Computer";
  }

  let playerDiv = document.getElementById(id);

  if (playerDiv) {
    playerDiv.innerHTML = "";
  }

  playerDiv = document.createElement("div");
  playerDiv.className = "player-container";
  playerDiv.id = id;
  body.appendChild(playerDiv);

  const titleDiv = document.createElement("div");
  titleDiv.className = "gameboard-title";
  titleDiv.textContent = label;
  playerDiv.appendChild(titleDiv);

  const gameboardDiv = document.createElement("div");
  gameboardDiv.className = "gameboard";
  playerDiv.appendChild(gameboardDiv);

  gameboard.positions.forEach((row, index) => {
    const cell = document.createElement("div");
    cell.className = "gameboard-cell";
    cell.setAttribute("data-cell", index);
    gameboardDiv.appendChild(cell);
    if (row.hasShip() && isHuman) {
      cell.classList.add("ship");
    }
    if (row.getIsHit()) {
      cell.textContent = "X";
    }
  });
}
