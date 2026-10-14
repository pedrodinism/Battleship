export function renderGameboard(gameboard) {
  const gameboardDiv = document.createElement("div");
  const body = document.querySelector("body");
  gameboardDiv.className = "gameboard";

  gameboard.positions.forEach((row, index) => {
    const cell = document.createElement("div");
    cell.className = "gameboard-cell";
    cell.setAttribute("data-cell", index);
    gameboardDiv.appendChild(cell);
  });

  body.appendChild(gameboardDiv);
}
