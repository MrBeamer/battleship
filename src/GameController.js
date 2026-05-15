import { Gameboard } from "./Gameboard.js";
import { GameView } from "./GameView.js";
import { Ship } from "./Ship.js";

class GameController {
  view = new GameView();
  gameBoard = new Gameboard();
  selectedShip = null;
  selectedShipPosition = null;
  shipPlacementPhase = null;
  shipAxis = "X";
  constructor() {
    // For hover, preselect phase
    this.view.gameBoard.addEventListener("pointerover", (event) =>
      this.handlePointeOver(event),
    );
    this.view.gameBoard.addEventListener("pointerout", (event) =>
      this.handlePointerOut(event),
    );

    // Pick up the ship the drag and drop
    this.view.shipContainer.addEventListener("click", (event) =>
      this.handleSelectShip(event),
    );

    this.view.gameBoard.addEventListener("click", (event) =>
      this.handlePlaceShip(event),
    );

    this.view.resetBtn.addEventListener("click", (event) => {
      this.reset(event);
    });

    this.view.rotateBtn.addEventListener("click", (event) => {
      this.rotateShip(event);
    });

    this.view.startBtn.addEventListener("click", (event) => {
      this.startGame(event);
    });
  }

  startGame() {
    console.log("start");
    this.view.shipContainer.classList.add("hidden");
    this.view.gameMenu.classList.add("hidden");
    this.view.gameNarrator.classList.add("hidden");
    //Renders the Gameboard with coordinates as Data-Attribute
    this.view.renderGameBoard(this.view.gameBoardNpc);
    // Remove hidden class from gameBoard-npc
    this.view.gameBoardFrameNpc.classList.remove("hidden");
    // Add align-boards to align the boards
    this.view.gameBoardsContainer.classList.add("align-boards");
  }

  rotateShip(event) {
    const rotateBtn = event.target.closest(".btn-rotate");
    if (!rotateBtn) return;
    this.shipAxis = this.shipAxis === "X" ? "Y" : "X";
    this.view.rotateBtn.textContent = `Rotate Ship (${this.shipAxis === "Y" ? "X" : "Y"})`;
  }

  handleSelectShip(event) {
    const selectedShip = event.target.closest(".ship");
    if (!selectedShip) return;
    // Safes the selected ship (html element) temporarily
    this.selectedShip = selectedShip;
    console.log(selectedShip);
  }

  handlePlaceShip(event) {
    const gameField = event.target.closest(".gameboard-field");
    if (!gameField) return;

    // Checks if ship would overlap
    const isOverLapping = this.view.isOverLapping(this.gameBoard.fleetPlayer1);
    if (isOverLapping) return;
    // Check if ship would be outOfBound
    const isOutOfBound = this.view.isOutOfBound();
    if (isOutOfBound) return;

    // Get currentTargetFields (html elements) and add highlight them permanently
    this.view.currentTargetFields.forEach((field) => {
      if (!field) return;
      field.classList.add("placed");
    });

    // If a ship is selected create an ship object and push into the fleetPlayer1 array
    if (!this.selectedShip) return;

    // Based on placed ship, create a new ship object.
    const ship = new Ship(
      this.selectedShip.dataset.shipLength,
      this.selectedShip.dataset.shipType,
      this.selectedShipPosition,
      this.shipAxis,
    );
    // Add ship to gameBoard (fleetPlayer1 array) - data
    this.gameBoard.placeShip(ship);
    console.log(ship);
    console.log(this.gameBoard.fleetPlayer1);

    // If ship is placed on the board, disable the ship button, so user can not pick it again
    this.selectedShip.disabled = true;
    //Hide ship unit
    this.view.shipUnitContainer.style.visibility = "hidden";

    // After placing ship, remove selected ship from the temp memory state
    this.selectedShip = null;
    // After placing ship, remove position from the temp memory state
    this.selectedShipPosition = null;
  }

  handlePointeOver(event) {
    //highlight fields only if ship has been picked
    if (!this.selectedShip) return;
    // gets ships placement coordinates
    const gameField = event.target.closest(".gameboard-field");
    if (!gameField) return;

    // Get actual temp ship coords
    const selectedShipCoords = this.gameBoard.getTempShipCoords(
      gameField,
      this.selectedShip.dataset.shipLength,
      this.shipAxis,
    );
    this.selectedShipPosition = selectedShipCoords;
    // Gets the hoovered or locked in html of the fields
    // I think returning targetfields can be removed and maybe rename the function to set instead of get?
    this.view.setTargetFields(selectedShipCoords);
    // Check if any ships is about to overlap or outOfBound, if so return true
    const isOverLapping = this.view.isOverLapping(this.gameBoard.fleetPlayer1);
    const isOutOfBound = this.view.isOutOfBound();
    // Add class that highlights divs for potential ship placements
    this.view.highlightTargetFields(isOverLapping, isOutOfBound);
  }

  handlePointerOut() {
    // Remove class that highlights divs for ship placement preview
    this.view.clearFieldHighlights();
  }

  ///////////////////////////////
  init() {
    console.log("Init App");
    //Renders the Gameboard with axis, coordinates as Data-Attribute
    this.view.renderGameBoard(this.view.gameBoard);

    //Type narrator message
    this.view.renderNarratorMessage();
  }

  reset() {
    console.log("reset");
    this.selectedShip = null;
    this.selectedShipPosition = null;
    this.gameBoard.fleetPlayer1 = [];
    // remove the temp highlighted fields from the temp memory state
    this.view.currentTargetFields = [];
    //Remove disable from all ships
    for (let ship of this.view.shipContainer.children) {
      ship.disabled = false;
    }
    //Remove all placed classes from the gameFields
    for (let gameField of this.view.gameBoard.children) {
      gameField.classList.remove("placed");
    }
    const clickSound = new Audio("path/to/sound.mp3");
    clickSound.play();
  }
}

export { GameController };
// created render for x and y axis, style game selection screen that every is aligned
//Based on the image (Ignore the text on the field squares), that I shared, create a layout, for space battleship game 8bit style (also color palette), do not add other elements which are not existing on the image layout.  Use a background like shared in the second image.

//Moved and refactored methods frome the class gameBoard into the view, to create one renderGameBoard which renders the the complete board instead of using 3 sepered functions to render the board, also reworkred the design of the ship placement phase and added groundwork for the second screen the actual game/ battle phase created a second gameboard the enemy, add the that start switches to this second screen.

// After workout
// need to write a line of code that lets only start the game if the fleetPlayer one array has a length of 5 which means every ship is placed.
