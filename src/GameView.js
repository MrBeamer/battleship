import Typewriter from "typewriter-effect/dist/core";

class GameView {
  currentTargetFields = [];

  constructor() {
    this.gameBoard = document.querySelector("#gameboard-player");
    this.gameBoardNpc = document.querySelector("#gameboard-npc");
    this.shipContainer = document.querySelector(".ship-container");
    this.ship = document.querySelector(".ship");
    this.resetBtn = document.querySelector(".btn-reset");
    this.gameMenu = document.querySelector(".game-menu");
    this.rotateBtn = document.querySelector(".btn-rotate");
    this.startBtn = document.querySelector(".btn-start");
    this.gameAxisY = document.querySelector(".game-y-axis-player");
    this.gameAxisX = document.querySelector(".game-x-axis-player");
    this.gameAxisYnpc = document.querySelector(".game-y-axis-npc");
    this.gameAxisXnpc = document.querySelector(".game-x-axis-npc");
    this.gameNarrator = document.querySelector(".game-narrator");
    this.playerNarrator = document.querySelector(".player-narrator");
    this.npcNarrator = document.querySelector(".npc-narrator");
    this.shipUnitContainer = document.querySelector(".ship-unit-container");
    this.narratorMessage = document.querySelector(".narrator-message");
    this.gameBoardFrameNpc = document.querySelector(".gameboard-frame-npc");
    this.gameBoardsContainer = document.querySelector(".gameboards-container");
    this.npcSide = document.querySelector(".npc-side");
    this.playerSideTitle = document.querySelector(".player-side-title");
    this.dialog = document.querySelector("dialog");
    this.resetGameBtn = document.querySelector(".btn-reset-game");
    this.gameOverMessage = document.querySelector(".game-over-message");
    this.winnerAnnouncement = document.querySelector(".announcement-winner");
    this.gameFrameCenter = document.querySelector(".game-frame-center");
    this.gameStartBtn = document.querySelector(".btn-game-start");
    this.titleScreen = document.querySelector(".game-starting-screen");
    this.insertCoinBtn = document.querySelector(".btn-insert-coin");
    this.arcadeOverlay = document.querySelector(".arcade-overlay");
  }

  hideShipUnits(selectedShip) {
    selectedShip.querySelector(".ship-unit-container").style.visibility =
      "hidden";
  }

  renderBattleScreen() {
    //Hide html elements from preparation screen
    this.shipContainer.classList.add("hidden");
    this.gameMenu.classList.add("hidden");
    this.gameNarrator.classList.add("hidden");
    //Renders the Gameboard with coordinates as Data-Attribute
    this.renderGameBoard(this.gameBoardNpc);
    // Remove hidden class from gameBoard-npc
    this.gameBoardFrameNpc.classList.remove("hidden");
    // Remove hidden class from npc-side
    this.npcSide.classList.remove("hidden");
    // Remove hidden class for player title
    this.playerSideTitle.classList.remove("hidden");
    // Remove hidden class for player narrator
    this.playerNarrator.classList.remove("hidden");
    // Remove hidden class for npc narrator
    this.npcNarrator.classList.remove("hidden");
    // Add align-boards to align the boards
    this.gameBoardsContainer.classList.add("align-boards");
  }

  renderShipPlacementScreen() {
    this.shipContainer.classList.remove("hidden");
    this.gameMenu.classList.remove("hidden");
    this.gameNarrator.classList.remove("hidden");
    // Add hidden class from gameBoard-npc
    this.gameBoardFrameNpc.classList.add("hidden");
    // Add hidden class from npc-side
    this.npcSide.classList.add("hidden");
    // Add hidden class for player title
    this.playerSideTitle.classList.add("hidden");
    // Add hidden class for player narrator
    this.playerNarrator.classList.add("hidden");
    // Add hidden class for npc narrator
    this.npcNarrator.classList.add("hidden");
    // Remove align-boards to align the boards
    this.gameBoardsContainer.classList.remove("align-boards");
  }

  showShipUnits() {
    for (let ship of this.shipContainer.children) {
      ship.querySelector(".ship-unit-container").style.visibility = "visible";
    }
  }

  renderWinnerAnnouncement(winner) {
    this.winnerAnnouncement.textContent = winner;
  }

  renderGameOverMessage(message) {
    this.gameOverMessage.textContent = message;
  }

  clearShipClasses(gameBoard) {
    for (let gameField of gameBoard.children) {
      gameField.classList.remove("placed");
      gameField.classList.remove("preview");
      gameField.classList.remove("ship-unit-destroyer");
      gameField.classList.remove("ship-unit-cruiser");
      gameField.classList.remove("ship-unit-dreadnought");
      gameField.classList.remove("ship-unit-corvette");
      gameField.classList.remove("ship-unit-frigate");
      gameField.classList.remove("miss");
      gameField.classList.remove("hit");
    }
  }

  renderGameBoard(gameBoard) {
    // Get ID from gameBoard conditionally rendering the axis for npc or player
    const gameBoardId = gameBoard.id;
    //Renders the Y axis of the gameBoard
    const renderAxisY = () => {
      console.log(gameBoardId);
      const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
      const axisY =
        gameBoardId === "gameboard-player" ? this.gameAxisY : this.gameAxisYnpc;
      for (let letter of alphabet) {
        const htmlElement = `<div class="legend-letters">${letter}</div>`;
        axisY.insertAdjacentHTML("beforeend", htmlElement);
      }
    };
    //Renders the X axis of the gameBoard
    const renderAxisX = () => {
      const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
      const axisX =
        gameBoardId === "gameboard-player" ? this.gameAxisX : this.gameAxisXnpc;
      for (let number of numbers) {
        const htmlElement = `<div class="legend-numbers">${number}</div>`;
        axisX.insertAdjacentHTML("beforeend", htmlElement);
      }
    };
    // Calls the functions here because the will not be called anywhere
    renderAxisX();
    renderAxisY();

    // Generates the letters used to create the letters for GameBoard
    const getCoordinatesLetters = (index) => {
      const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];
      let calcIndex = Math.floor((index - 1) / 10);
      return letters[calcIndex];
    };
    // Generates the numbers used to create the numbers for GameBoard
    const getCoordinatesNumbers = (index) => {
      if (index % 10 === 0) return 10;
      else return index % 10;
    };
    // Injects the created fields into the GameBoard Container
    for (let i = 1; i <= 100; i++) {
      gameBoard.insertAdjacentHTML(
        "beforeend",
        `<div class="gameboard-field" data-coord-x="${getCoordinatesNumbers(i)}" data-coord-y="${getCoordinatesLetters(i)}" data-coords="${getCoordinatesLetters(i)}${getCoordinatesNumbers(i)}">${getCoordinatesLetters(i)}-${getCoordinatesNumbers(i)}</div>`,
      );
    }
  }

  // instead of human clicking on gameField (dataType is html element), this returns a random one
  getRandomFieldNpc = () => {
    for (const gameField of this.gameBoardNpc.children) {
      console.log(gameField);
    }
  };

  renderNarratorMessage() {
    // const test = new Typewriter(".narrator-message", {
    //   strings: [
    //     "Hi Captain Pengu!",
    //     "Click a ship to select it, click a map tile to place it, and use the Rotate button to change its orientation before placement.",
    //   ],
    //   autoStart: true,
    //   loop: false,
    //   delay: 40,
    // });

    new Typewriter(".narrator-message", {
      strings:
        "Click a ship to select it, click a map tile to place it, and use the Rotate button to change its orientation before placement.",
      autoStart: true,
      loop: false,
      delay: 30,
    });
  }

  setTargetFields(targetShipCoords, gameBoard) {
    // Searches the correct divs based on ships coordinates
    const targetFields = targetShipCoords.map((coord) => {
      for (const field of gameBoard.children) {
        // console.log(field.dataset.coords);
        if (field.dataset.coords === coord) {
          return field;
        }
      }
    });
    //Updates current fields by hovering over them
    this.currentTargetFields = targetFields;
  }

  isOverLapping(fleet) {
    const checkedFields = this.currentTargetFields.map((field) => {
      if (!field) return;
      // Checks based on placed ships and there coords if field is occupied already
      return fleet.some((ship) => ship.position.includes(field.dataset.coords));
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

  getRandomFieldClickNpc(randomCoord, gameBoard) {
    for (const gameField of gameBoard.children) {
      if (gameField.dataset.coords === randomCoord) return gameField;
    }
  }
}

export { GameView };
