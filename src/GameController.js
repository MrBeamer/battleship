import { Gameboard } from "./Gameboard.js";
import { GameView } from "./GameView.js";
import { Ship } from "./Ship.js";
class GameController {
  view = new GameView();
  gameBoard = new Gameboard();
  selectedShip = null;
  selectedShipPosition = null;
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

    // Get currentTargetFields (html elements) and add highlight them permanently
    this.view.currentTargetFields.forEach((element, index) => {
      if (!element) return;
      element.classList.add("placed");
    });

    if (!this.selectedShip) return;
    // Based on placed ship, create a new ship object
    const ship = new Ship(
      this.selectedShip.dataset.shipLength,
      this.selectedShip.dataset.shipType,
      this.selectedShipPosition,
    );
    // Add ship to gameBoard (fleetPlayer1 array) - data
    this.gameBoard.placeShip(ship);
    console.log(ship);
    console.log(this.gameBoard.fleetPlayer1);
    // If ship is placed on the board, this make is impossible to pick the same ship again
    this.selectedShip.disabled = true;
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
    );
    this.selectedShipPosition = selectedShipCoords;
    // Gets the hoovered or locked in html of the fields
    const targetFields = this.view.getTargetFields(selectedShipCoords);
    console.log(targetFields);
    // Add class that highlights divs for potential ship placement
    targetFields.forEach((element) => {
      if (!element) return;
      console.log(element.dataset.coords);
      // Checks based on placed ships and there coords if field is occupied already
      const isOverlapping = this.gameBoard.fleetPlayer1.some((ship) =>
        ship.position.includes(element.dataset.coords),
      );
      isShipOverLapping;
      console.log(isOverlapping);
      if (isOverlapping) element.classList.add("overlapping");
      else {
        element.classList.add("preview");
      }
    });
  }

  handlePointerOut() {
    // Remove class that highlights divs for ship placement preview

    this.view.currentTargetFields.forEach((element) => {
      if (!element) return;
      element.classList.remove("preview");
      element.classList.remove("overlapping");
    });
  }

  ///////////////////////////////
  init() {
    console.log("Init App");
    //Renders the Gameboard with coordinates as Data-Attribute
    this.view.renderGameBoardFields(
      this.gameBoard.getCoordinatesLetters,
      this.gameBoard.getCoordinatesNumbers,
    );
  }

  reset() {
    console.log("reset");
    this.selectedShip = null;
    this.selectedShipPosition = null;
    this.gameBoard.fleetPlayer1 = [];
    //Remove disable from all ships
    for (let ship of this.view.shipContainer.children) {
      ship.disabled = false;
    }
    //Remove all placed classes from the gameFields
    for (let gameField of this.view.gameBoard.children) {
      gameField.classList.remove("placed");
    }
  }
}

export { GameController };
// Saturday
// Add Reset
// After ship placed on the gameboard, lock the ship from selection
// moved selectedShipPosition from gameboard to controller

// next i have to iterate over every ship in playerFleet 1 and get the coordinates if any coordinate matches
// return true (isOverlapping) and add hover effect red and disable placement for an ship on this field
// Sunday
//  Refactoring
//      Moved remove classes functions in the view
//      Moved add classes functions in the view
//      Moved isOverLapping function in the view
