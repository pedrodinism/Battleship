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

export function renderGameOverDialog() {
  const mainContent = document.querySelector(".mainContent");

  let dialog = document.getElementById("gameOverDialog");

  if (!dialog) {
    dialog = document.createElement("dialog");
    dialog.id = "gameOverDialog";
    mainContent.appendChild(dialog);
  } else {
    dialog.innerHTML = "";
  }

  const winnerDiv = document.createElement("div");
  winnerDiv.className = "winner-container";
  dialog.appendChild(winnerDiv);

  const button = document.createElement("button");
  button.textContent = "Play again";
  button.id = "restart-button";
  dialog.appendChild(button);
}

export function closeGameOverDialog() {
  const dialog = document.getElementById("gameOverDialog");
  dialog.close();
}

export function openGameOverDialog(winner) {
  const dialog = document.getElementById("gameOverDialog");
  const winnerDiv = document.querySelector(".winner-container");
  winnerDiv.textContent = winner + " won!";
  dialog.showModal();
}
