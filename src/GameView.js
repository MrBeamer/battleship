import Typewriter from "typewriter-effect/dist/core";
import {
  villainTaunts,
  antiHeroTaunts,
  getRandomNumber,
  lookUpShipImg,
  getRandomCoord,
} from "./helper.js";

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
    this.rotateBtnIcon = document.querySelector(".btn-rotate-icon");
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
    this.arcadeOverlay = document.querySelector(".arcade-overlay");
    this.shipSprites = document.getElementsByClassName("ship-sprite");
  }

  hideShipUnits(selectedShip) {
    selectedShip.querySelector(
      ".ship-unit-container .ship-unit-sprite",
    ).style.visibility = "hidden";
  }

  showShipUnits() {
    document.querySelectorAll(".ship-unit-sprite").forEach((shipSprite) => {
      shipSprite.style.visibility = "visible";
    });
  }

  // Based on different parameters of selected ship, add the correct ship img on the board
  placeShipImg(startField, shipLength, axis, shipType) {
    const img = document.createElement("img");
    // Look up for the img url
    const shipImg = lookUpShipImg(shipType);
    img.src = shipImg;
    img.style.position = "absolute";
    img.style.pointerEvents = "none";
    img.style.zIndex = "1";
    img.classList.add("ship-sprite");

    if (axis === "X") {
      img.style.width = `${shipLength * 50}px`;
      img.style.height = "50px";
      img.style.top = "0";
      img.style.left = "0";
    } else {
      // Keep width/height, rotate 90deg, reposition
      img.style.width = `${shipLength * 50}px`;
      img.style.height = "50px";
      img.style.transformOrigin = "top left";
      img.style.transform = "rotate(90deg)";
      img.style.top = "0";
      img.style.left = "50px";
    }

    startField.style.position = "relative";
    startField.appendChild(img);
  }

  displaySunkNpcShip(firstCoord, shipLength, shipAxis, shipType) {
    for (let field of this.gameBoardNpc.children) {
      if (field.dataset.coords == firstCoord) {
        this.placeShipImg(field, shipLength, shipAxis, shipType);
      }
    }
  }

  renderRotateBtnIcon(shipAxis) {
    this.rotateBtnIcon.textContent =
      shipAxis === "Y" ? "arrow_downward" : "arrow_forward";
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
    // Add removeStyling to align gameBoards
    this.gameAxisX.classList.add("remove-styling");
    this.gameAxisY.classList.add("add-styling");
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

  renderWinnerAnnouncement(winner) {
    this.winnerAnnouncement.textContent = winner;
  }

  renderGameOverMessage(message) {
    this.gameOverMessage.textContent = message;
  }

  // i think i can remove this but i need to remove the ships
  clearShipClasses(gameBoard) {
    for (let gameField of gameBoard.children) {
      gameField.classList.remove("placed");
      gameField.classList.remove("preview");
      gameField.classList.remove("miss");
      gameField.classList.remove("hit");
    }
  }

  clearShipImgs() {
    [...this.shipSprites].forEach((shipSprite) => {
      shipSprite.remove();
    });
  }

  renderGameBoard(gameBoard) {
    const gameBoardLength = gameBoard.children.length;
    console.log(gameBoardLength);
    //Makes sure board gets only initially rendered not on every reset
    if (gameBoardLength > 0) return;
    console.log("important:");
    console.log(gameBoard);
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
        `<div class="gameboard-field" data-coord-x="${getCoordinatesNumbers(i)}" data-coord-y="${getCoordinatesLetters(i)}" data-coords="${getCoordinatesLetters(i)}${getCoordinatesNumbers(i)}"></div>`,
      );
    }
    console.log(gameBoardLength);
  }

  renderBattleMessage(playerTurn, action) {
    if (playerTurn) {
      new Typewriter(".player-narrator-message-battle", {
        strings:
          action === "hit"
            ? antiHeroTaunts.hit[getRandomNumber(antiHeroTaunts.hit.length)]
            : antiHeroTaunts.miss[getRandomNumber(antiHeroTaunts.miss.length)],
        autoStart: true,
        loop: false,
        delay: 20,
      });
    } else {
      new Typewriter(".npc-narrator-message-battle", {
        strings:
          action === "hit"
            ? villainTaunts.hit[getRandomNumber(villainTaunts.hit.length)]
            : villainTaunts.miss[getRandomNumber(villainTaunts.miss.length)],
        autoStart: true,
        loop: false,
        delay: 20,
      });
    }
  }

  renderNarratorMessage() {
    new Typewriter(".narrator-message", {
      strings:
        "Captain, click a ship to select it, click a map tile to place it, and use the Rotate button to change its orientation before placement.",
      autoStart: true,
      loop: false,
      delay: 50,
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

  getRandomFieldClickNpcTest() {
    let miss = true;
    let hit = true;
    let field = null;
    let coord = null;
    while (miss || hit) {
      coord = getRandomCoord();
      field = document.querySelector(`[data-coords="${coord}"]`);
      miss = field.classList.contains("miss");
      hit = field.classList.contains("hit");
    }
    return { field, coord };
  }

  getRandomFieldClickNpc(randomCoord, gameBoard) {
    for (const gameField of gameBoard.children) {
      if (gameField.dataset.coords === randomCoord) return gameField;
    }
  }
}

export { GameView };
