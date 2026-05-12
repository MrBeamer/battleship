class GameView {
  currentTargetFields = [];

  constructor() {
    this.gameBoard = document.querySelector("#gameboard");
    this.shipContainer = document.querySelector(".ship-container");
    this.ship = document.querySelector(".ship");
    this.resetBtn = document.querySelector(".btn-reset");
    this.gameMenu = document.querySelector(".game-menu");
    this.rotateBtn = document.querySelector(".btn-rotate");
  }

  renderGameBoardFields(coordinatesLetters, coordinatesNumbers) {
    for (let i = 1; i <= 100; i++) {
      this.gameBoard.insertAdjacentHTML(
        "beforeend",
        `<div class="gameboard-field" data-coord-x="${coordinatesNumbers(i)}" data-coord-y="${coordinatesLetters(i)}" data-coords="${coordinatesLetters(i)}${coordinatesNumbers(i)}">${coordinatesLetters(i)}-${coordinatesNumbers(i)}</div>`,
      );
    }
  }

  setTargetFields(targetShipCoords) {
    // Searches the correct divs based on ships coordinates
    const targetFields = targetShipCoords.map((coord) => {
      for (const field of this.gameBoard.children) {
        // console.log(field.dataset.coords);
        if (field.dataset.coords === coord) {
          return field;
        }
      }
    });
    //Updates current fields by hovering over them
    this.currentTargetFields = targetFields;
  }

  isOverLapping(fleetPlayer1) {
    const checkedFields = this.currentTargetFields.map((field) => {
      if (!field) return;
      // Checks based on placed ships and there coords if field is occupied already
      return fleetPlayer1.some((ship) =>
        ship.position.includes(field.dataset.coords),
      );
    });
    // Checks the if any of the tested fields is not true
    return checkedFields.some((field) => field === true);
  }

  isOutOfBound() {
    let isOutOfBound = this.currentTargetFields.some(
      (field) => field === undefined,
    );
    return isOutOfBound;
  }

  highlightTargetFields(isOverLapping, isOutOfBound) {
    this.currentTargetFields.forEach((field) => {
      if (!field) return;
      if (isOutOfBound) return field.classList.add("outOfBound");
      if (isOverLapping) field.classList.add("overlapping");
      else {
        field.classList.add("preview");
      }
    });
  }

  clearFieldHighlights() {
    this.currentTargetFields.forEach((field) => {
      if (!field) return;
      field.classList.remove("preview");
      field.classList.remove("overlapping");
      field.classList.remove("outOfBound");
    });
  }
}

export { GameView };
