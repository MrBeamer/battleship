import { Gameboard } from "./Gameboard.js";
import { GameView } from "./GameView.js";
import { Ship } from "./Ship.js";
import { getRandomShipAxis } from "./helper.js";
import { getRandomCoord } from "./helper.js";
import { lookUpShipType } from "./helper.js";

class GameController {
  view = new GameView();
  gameBoard = new Gameboard();
  selectedShip = null;
  selectedShipPosition = null;
  shipPlacementPhase = null; // maybe not used
  shipAxis = "X";
  shipNavigationState = null; // maybe not used
  gamePhase = "preparation";
  playerTurn = true;
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

    // Game Menu Controls
    this.view.resetBtn.addEventListener("click", (event) => {
      this.reset(event);
    });

    this.view.rotateBtn.addEventListener("click", (event) => {
      this.rotateShip(event);
    });

    this.view.startBtn.addEventListener("click", (event) => {
      this.startGame(event);
    });

    // Battle Phase, get coordinates and compare with ship array of npc
    this.view.gameBoardNpc.addEventListener("click", (event) => {
      this.shootNpcShip(event);
    });
  }

  shootNpcShip(event) {
    const shootingTarget = event.target.closest(".gameboard-field");
    // Returns if field is undefined, clicked between lines
    if (!shootingTarget) return;
    // Makes sure if player hit a ship field that it can not be targeted again
    if (
      shootingTarget.classList.contains("hit") ||
      shootingTarget.classList.contains("miss")
    )
      return;
    // Gets the coordinate from target
    const targetCoord = shootingTarget.dataset.coords;
    // Saves hit boolean true or false
    let hit = null;
    console.log(targetCoord);
    console.log(shootingTarget);
    for (let ship of this.gameBoard.fleetNpc) {
      console.log(ship.position);
      hit = ship.position.some((coord) => {
        console.log(coord);
        return coord === targetCoord;
      });
      console.log(hit);
      // If field has ship unit, add hit to the div
      if (hit) {
        console.log("hit");
        shootingTarget.classList.add("hit");
        return;
      }
    }
    // If field has no ship unit, add miss to the div
    if (!hit) {
      shootingTarget.classList.add("miss");
    }
  }

  /////////////////////////////////////
  initializeNpcShipPlacements() {
    // call the function initializeNpcShipPlacements
    // creates ships, which are substitutes for players html element ships, also reduce complexity
    const npcShipList = [
      new Ship(5, "dreadnought", "placeholderPosition", "placeholderAxis"),
      new Ship(4, "cruiser", "placeholderPosition", "placeholderAxis"),
      new Ship(3, "destroyer", "placeholderPosition", "placeholderAxis"),
      new Ship(3, "frigate", "placeholderPosition", "placeholderAxis"),
      new Ship(2, "corvette", "placeholderPosition", "placeholderAxis"),
    ];
    // Do this for every ship
    npcShipList.forEach((ship) => {
      let isOverLapping = true;
      let isOutOfBound = true;
      let randomShipAxis = null;
      let selectedShipCoords = null;
      while (isOverLapping || isOutOfBound) {
        // Gets a random coord like A3 , should run only per ship not for every gameField, thats why placed here
        const randomCoord = getRandomCoord();
        // instead of human clicking on gameField (dataType is html element), this returns a random one
        const getRandomFieldClickNpc = () => {
          for (const gameField of this.view.gameBoardNpc.children) {
            if (gameField.dataset.coords === randomCoord) return gameField;
          }
        };

        const randomField = getRandomFieldClickNpc();
        const shipLength = ship.length;
        // Calls the helper function to get random Axis
        randomShipAxis = getRandomShipAxis();

        // console.log(randomField);
        // Gets the position of the ship (coordinates as array)
        selectedShipCoords = this.gameBoard.getTempShipCoords(
          randomField,
          shipLength,
          randomShipAxis,
        );

        // console.log(selectedShipCoords);
        //Set currentFields to the current occupied html elements
        this.view.setTargetFields(selectedShipCoords, this.view.gameBoardNpc);
        // Checks if ship isOverlapping
        isOverLapping = this.view.isOverLapping(this.gameBoard.fleetNpc);
        // Checks if ship outOfBound
        isOutOfBound = this.view.isOutOfBound();
      }
      // UI - Places ship
      this.view.currentTargetFields.forEach((field) => {
        if (!field) return;
        // Lookup correct ship class, to color field in the ship color
        const shipTypeClass = lookUpShipType(ship.type);
        // replace later one with other class, because should be hidden and only visible on hit
        field.classList.add("placed", shipTypeClass);
      });

      // Data: Update ship with coordinates and axis
      const upDateShip = () => {
        ship.position = selectedShipCoords;
        ship.axis = randomShipAxis;
      };
      upDateShip();

      // Push the updated ship into the fleet array
      this.gameBoard.fleetNpc.push(ship);
    }); // end of ship for each currently
    console.log(this.gameBoard.fleetNpc);
    console.log(this.view.currentTargetFields);
  }

  /////////////////////////////////////
  startGame() {
    console.log("start");
    // Game can only start, if all ships are placed
    // if (this.gameBoard.fleetPlayer1.length !== 5) return;

    this.view.shipContainer.classList.add("hidden");
    this.view.gameMenu.classList.add("hidden");
    this.view.gameNarrator.classList.add("hidden");
    //Renders the Gameboard with coordinates as Data-Attribute
    this.view.renderGameBoard(this.view.gameBoardNpc);
    // Remove hidden class from gameBoard-npc
    this.view.gameBoardFrameNpc.classList.remove("hidden");
    // Remove hidden class from npc-side
    this.view.npcSide.classList.remove("hidden");
    // Remove hidden class for player title
    this.view.playerSideTitle.classList.remove("hidden");
    // Remove hidden class for player narrator
    this.view.playerNarrator.classList.remove("hidden");
    // Remove hidden class for npc narrator
    this.view.npcNarrator.classList.remove("hidden");
    // Add align-boards to align the boards
    this.view.gameBoardsContainer.classList.add("align-boards");
    // Initializes the npc board by placing all 5 ships randomly on it
    this.initializeNpcShipPlacements();
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

    // Check if previously a ship selection button, was clicked if so remove the class selected
    if (this.selectedShip?.classList.contains("selected")) {
      this.selectedShip.classList.remove("selected");
    }
    // After removing the class from previously clicked button add it to the current clicked one
    selectedShip.classList.add("selected");

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
      // Lookup correct ship class, to color field in the ship color
      const shipTypeClass = lookUpShipType(this.selectedShip.dataset.shipType);
      field.classList.add("placed", shipTypeClass);
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
    this.view.hideShipUnits(this.selectedShip);
    // After placing ship, remove the selected class from the button
    this.selectedShip.classList.remove("selected");
    // After placing ship, remove selected ship from the temp memory state
    this.selectedShip = null;
    // After placing ship, remove position from the temp memory state
    this.selectedShipPosition = null;
    // After placing ship, remove fields from the temp memory state
    this.view.currentTargetFields = [];
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
    this.view.setTargetFields(selectedShipCoords, this.view.gameBoard);
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

  ///////////////////////////////////
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
//TODAY GOAL: fire shoot, hit detection highlight fields on miss and hit
// ARCHIVED

//GOAL:s
// Flow: click to shoot > if hit > another shot > if no hit > next player turn
// Change hit property of ship, when hit

// add method that creates ship objects and pushes them in array fleet 2
// Create addeventlistner to get coordinates and compare with ship array of npc
// UI: Confirm hit and apply classes to show in the UI
// Data: Update ship hint counter to and sync with UI
