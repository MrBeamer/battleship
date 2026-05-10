class GameView {
  currentTargetFields = [];

  constructor() {
    this.gameBoard = document.querySelector("#gameboard");
    this.shipContainer = document.querySelector(".ship-container");
    this.ship = document.querySelector(".ship");
    this.resetBtn = document.querySelector(".btn-reset");
  }

  renderGameBoardFields(coordinatesLetters, coordinatesNumbers) {
    for (let i = 1; i <= 100; i++) {
      this.gameBoard.insertAdjacentHTML(
        "beforeend",
        `<div class="gameboard-field" data-coord-x="${coordinatesNumbers(i)}" data-coord-y="${coordinatesLetters(i)}" data-coords="${coordinatesLetters(i)}${coordinatesNumbers(i)}">${coordinatesLetters(i)}-${coordinatesNumbers(i)}</div>`,
      );
    }
  }

  getTargetFields(targetShipCoords) {
    // Searches the correct divs based on ships coordinates
    const targetFields = targetShipCoords.map((coord) => {
      for (const field of this.gameBoard.children) {
        // console.log(field.dataset.coords);

        if (field.dataset.coords === coord) {
          //   console.log(field);
          return field;
        }
      }
    });
    //Updates current fields by hovering over them
    this.currentTargetFields = targetFields;
    return targetFields;
  }

  clearFieldHighlights() {
    this.currentTargetFields.forEach((field) => {
      if (!field) return;
      field.classList.remove("preview");
      field.classList.remove("overlapping");
    });
  }
}

export { GameView };
