import { Gameboard } from "./Gameboard.js";
import { GameView } from "./GameView.js";
import { Ship } from "./Ship.js";

class GameController {
  view = new GameView();
  gameBoard = new Gameboard();
  constructor() {
    this.view.gameBoard.addEventListener("mouseover", (event) =>
      this.handleAddClass(event),
    );
    this.view.gameBoard.addEventListener("mouseout", (event) =>
      this.handleRemoveClass(event),
    );
    this.view.gameBoard.addEventListener("click", (event) =>
      this.handleShipPlacement(event),
    );

    // Handles the drop of the ship
    this.view.shipSlots.addEventListener("dragstart", (event) =>
      this.handleDragStart(event),
    );

    this.view.gameBoard.addEventListener("dragover", (event) =>
      this.handleDragOver(event),
    );
    this.view.gameBoard.addEventListener("drop", (event) =>
      this.handleDragDrop(event),
    );
  }

  // Handle the drag and drop of the Ship
  handleDragStart(event) {
    // Gets ship length of selected ship
    const shipLength = event.target.dataset.shipLength;
    console.log(`Length of selected ship: ${shipLength}`);

    const dragEvent = event;
    // Sets / adds the ship length to the current selected drag event (ship)
    dragEvent.dataTransfer.setData("shipLength", shipLength);
  }

  handleDragOver(event) {
    event.preventDefault();
  }

  handleDragDrop(event) {
    event.preventDefault();
    const shipLength = event.dataTransfer.getData("shipLength");
    console.log(`Length of dropped ship: ${shipLength}`);
  }

  handleAddClass(event) {
    // gets ships placement coordinates
    const gameField = event.target.closest(".gameboard-field");
    if (!gameField) return;
    // Get temp ship coords - mouseover
    const targetShipCoords = this.gameBoard.getTempShipCoords(gameField);
    // Gets the hoovered or locked in html of the fields
    const targetFields = this.view.getTargetFields(targetShipCoords);

    // console.log(targetFields);
    // Add class that highlights divs for potential ship placement
    targetFields.forEach((element) => {
      if (!element) return;
      element.classList.add("ship");
    });
  }

  handleRemoveClass() {
    console.log("test");
    // Remove class that highlights divs for potential ship placement
    this.view.currentTargetFields.forEach((element) => {
      if (!element) return;
      element.classList.remove("ship");
    });
  }
  // place ship and get the placement coordinates
  handleShipPlacement(event) {
    const gameField = event.target.closest(".gameboard-field");
    if (!gameField) return;
    console.log("ship");
    this.view.currentTargetFields.forEach((element) => {
      if (!element) return;
      element.classList.add("ship-perma");
    });
    // After Ship is dropped, get Permanent Ship Coords from the board
    this.gameBoard.getPermShipCoords(gameField);
  }

  init() {
    console.log("Hello World");
    //Renders the Gameboard with coordinates as Data-Attribute
    this.view.renderGameBoardFields(this.gameBoard.getCoordinates);
    const carrier = new Ship(5);
    const battleship = new Ship(4);
    const cruiser = new Ship(3);
    const submarine = new Ship(3);
    const destroyer = new Ship(2);
    console.log(carrier);
    // A ship is basically an just on object with the length as data
    // The visualize the ship I need to display based on the length divs, because a ship just consist out of highlighted tiles
  }
}

export { GameController };
