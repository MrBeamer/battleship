import { Gameboard } from "./Gameboard.js";
import { GameView } from "./GameView.js";
import { Ship } from "./Ship.js";
class GameController {
  view = new GameView();
  gameBoard = new Gameboard();
  selectedShip = null;
  selectedShipCoords = null;
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
    this.view.currentTargetFields.forEach((element) => {
      if (!element) return;
      element.classList.add("placed");
    });

    // Based on placed ship, create a new ship object
    const ship = new Ship(
      this.selectedShip.dataset.shipLength,
      this.selectedShip.dataset.shipType,
      this.gameBoard.shipPosition,
    );
    // Add ship to gameBoard (fleet 1) - data
    this.gameBoard.placeShip(ship);
    console.log(ship);
    console.log(this.gameBoard.fleetPlayer1);
  }

  handlePointeOver(event) {
    //highlight fields only if ship has been picked
    if (!this.selectedShip) return;
    // gets ships placement coordinates
    const gameField = event.target.closest(".gameboard-field");
    if (!gameField) return;

    // Get actual temp ship coords
    const targetShipCoords = this.gameBoard.getTempShipCoords(
      gameField,
      this.selectedShip.dataset.shipLength,
    );
    // Gets the hoovered or locked in html of the fields
    const targetFields = this.view.getTargetFields(targetShipCoords);
    // Add class that highlights divs for potential ship placement
    targetFields.forEach((element) => {
      if (!element) return;
      element.classList.add("preview");
    });
  }

  handlePointerOut() {
    // Remove class that highlights divs for ship placement preview
    this.view.currentTargetFields.forEach((element) => {
      if (!element) return;
      element.classList.remove("preview");
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

    // const carrier = new Ship(5);
    // const battleship = new Ship(4);
    // const cruiser = new Ship(3);
    // const submarine = new Ship(3);
    // const destroyer = new Ship(2);
    // console.log(carrier);
    // A ship is basically an just on object with the length as data
    // The visualize the ship I need to display based on the length divs, because a ship just consist out of highlighted tiles
  }
}

export { GameController };
