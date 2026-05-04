class GameView {
  currentTargetFields = [];

  constructor() {
    this.gameBoard = document.querySelector("#gameboard");
    this.shipSlots = document.querySelector(".ship-slots");
  }

  renderGameBoardFields(coordinates) {
    for (let i = 1; i <= 100; i++) {
      this.gameBoard.insertAdjacentHTML(
        "beforeend",
        `<div class="gameboard-field" data-coord-x="${i}" data-coord-y="${coordinates(i)}" data-coords="${coordinates(i)}${i}">${coordinates(i)}-${i}</div>`,
      );
    }
  }

  getTargetFields(targetShipCoords) {
    // Searches the correct divs based on ships coordinates
    const targetFields = targetShipCoords.map((coord) => {
      for (const field of this.gameBoard.children) {
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
}

export { GameView };
