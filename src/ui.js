import { triggerAttack } from "./controller.js";

//only add the listener to the gameboard!

export function addListeners() {
  const computerGameboard = document.querySelector("#player-computer");
  computerGameboard.addEventListener("click", (event) => {
    const cell = event.target.dataset.cell;
    if (!cell) {
      return;
    }
    triggerAttack(cell);
  });

  /*
  const restartButton = document.getElementById("restart-button");
  restartButton.addEventListener("click", () => {
    restartGame();
  });
  */
}
