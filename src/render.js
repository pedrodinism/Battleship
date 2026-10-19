export function renderGameboard(player) {
  const gameboard = player.gameboard;
  if (!gameboard) {
    return;
  }

  const mainContent = document.querySelector(".mainContent");

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
  } else {
    playerDiv = document.createElement("div");
    playerDiv.className = "player-container";
    playerDiv.id = id;
    mainContent.appendChild(playerDiv);
  }

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
    if (row.hasShip() && (isHuman || row.getIsHit())) {
      cell.classList.add("ship");
    }
    if (row.getIsHit()) {
      cell.textContent = "X";
    }
  });
}

export function renderGameOverDialog(winner) {
  // needs logic to be rerendered
  const mainContent = document.querySelector(".mainContent");

  const dialog = document.createElement("dialog");
  dialog.id = "gameOverDialog";
  mainContent.appendChild(dialog);

  const winnerDiv = document.createElement("div");
  winnerDiv.textContent = winner + " won!";
  winnerDiv.className = "winner-container";
  dialog.appendChild(winnerDiv);

  const button = document.createElement("button");
  button.textContent = "Play again";
  button.id = "restart-button";
}

export function closeGameOverDialog() {
  const dialog = document.getElementById("gameOverDialog");
  dialog.close();
}

export function openGameOverDialog() {
  const dialog = document.getElementById("gameOverDialog");
  dialog.showModal();
}
