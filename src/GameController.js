import { Gameboard } from "./Gameboard.js";
import { GameView } from "./GameView.js";
import { Ship } from "./Ship.js";
import { getRandomShipAxis } from "./helper.js";
import { getRandomCoord } from "./helper.js";
import { lookUpShipType } from "./helper.js";
import { playSound } from "./helper.js";

class GameController {
  view = new GameView();
  gameBoard = new Gameboard();
  selectedShip = null;
  selectedShipPosition = null;
  shipPlacementPhase = null; // maybe not used
  shipAxis = "X";
  shipNavigationState = null; // maybe not used
  gamePhase = "preparation"; // maybe not used
  playerTurn = true;
  isGameOver = false;
  titleScreenMusic = null;
  constructor() {
    // Title screen start game
    this.view.gameStartBtn.addEventListener("click", (event) => {
      this.startPreparation(event);
    });
    this.view.arcadeOverlay.addEventListener("click", (event) => {
      this.insertCoin(event);
    });

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
      this.resetShipPlacement(event);
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
    this.view.resetGameBtn.addEventListener("click", (event) => {
      this.resetGame(event);
    });
  }

  checkGameOver() {
    const isNpcFleetSunk = this.gameBoard.fleetNpc.every((ship) =>
      ship.isSunk(),
    );
    const isPlayerFleetSunk = this.gameBoard.fleetPlayer1.every((ship) =>
      ship.isSunk(),
    );
    if (isPlayerFleetSunk) {
      // Renders winner in the GameOver screen
      this.view.renderWinnerAnnouncement("YOU LOSE");
      this.view.renderGameOverMessage(
        "We lost the battle, Captain. Better luck on the next voyage.",
      );
      this.isGameOver = true;
      //Open GameOver Menu
      this.view.dialog.showModal();
      playSound("game-lost");
    } else if (isNpcFleetSunk) {
      // Renders winner in the GameOver screen
      this.view.renderWinnerAnnouncement("YOU WIN");
      this.view.renderGameOverMessage(
        "Mission accomplished, Captain! You truly are the master of the seas.",
      );
      this.isGameOver = true;
      //Open GameOver Menu
      this.view.dialog.showModal();
      playSound("game-won");
    }
    // move up after test
    // this.view.renderWinnerAnnouncement("YOU WIN");
    // this.view.renderGameOverMessage(
    //   "Mission accomplished, Captain! You truly are the master of the seas.",
    // );
    // Opens dialog if game is over
  }

  toggleTurn() {
    // Check after every turn, if there is a winner
    this.checkGameOver();
    // Toggles depending on which players turn is
    this.playerTurn = !this.playerTurn;
    return this.playerTurn;
  }

  processAttack(shootingTargetField, targetCoord, fleet) {
    // Saves hit boolean true or false
    let hit = null;
    console.log(targetCoord);
    console.log(shootingTargetField);
    for (let ship of fleet) {
      console.log(ship.position);
      hit = ship.position.some((coord) => {
        return coord === targetCoord;
      });
      console.log(hit);
      // If field has ship unit, add hit to the div
      if (hit) {
        console.log("hit");
        playSound("hit-ship");
        shootingTargetField.classList.add("hit");
        // add here helper function with updates ship that its hit
        const hitShip = fleet.find((ship) => {
          return ship.position.includes(targetCoord);
        });
        // Increments hint counter in the ship object
        hitShip.hit();
        // Checks after every hit if ship is sunk
        const isShipSunk = hitShip.isSunk();
        if (isShipSunk) {
          //play sound
          // make ship visible
          console.log("ship is sunk");
          playSound("sunk-ship");
        }

        return hit;
      }
    }
    // If field has no ship unit, add miss to the div
    if (!hit) {
      shootingTargetField.classList.add("miss");
      //Play sound if you miss
      playSound("miss-ship");
    }
    return hit;
  }

  shootNpcShip(event) {
    // Makes sure shooting is not possible when game is over
    if (this.isGameOver) return;
    // Makes sure that player only can shot, when it is his turn
    if (!this.playerTurn) return;
    // delete later
    console.log("player turn");
    const shootingTargetField = event.target.closest(".gameboard-field");
    // Returns if field is undefined, clicked between lines
    if (!shootingTargetField) return;
    // Makes sure if player hit a ship field that it can not be targeted again
    if (
      shootingTargetField.classList.contains("hit") ||
      shootingTargetField.classList.contains("miss")
    )
      return;
    // Gets the coordinate from target
    const targetCoord = shootingTargetField.dataset.coords;
    const isHit = this.processAttack(
      shootingTargetField,
      targetCoord,
      this.gameBoard.fleetNpc,
    );
    // After player shot, switch to npc
    this.toggleTurn();
    // after switching to npc he can attack, use timeout to have delay between player shot and npc shot
    setTimeout(() => {
      this.npcAttack();
    }, 2000);
  }

  npcAttack() {
    // Makes sure shooting is not possible when game is over
    if (this.isGameOver) return;
    console.log("npc turn");
    // True to start first while loop, when player misses then gets reassigned depending on npc hits or misses
    const randomCoord = getRandomCoord();
    // instead of human clicking on gameField (dataType is html element), this returns a random one
    const randomShootingTargetField = this.view.getRandomFieldClickNpc(
      randomCoord,
      this.view.gameBoard,
    );
    const isHit = this.processAttack(
      randomShootingTargetField,
      randomCoord,
      this.gameBoard.fleetPlayer1,
    );
    // After miss shot, next players turn
    console.log(this.gameBoard.fleetPlayer1);
    this.toggleTurn();
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
        const randomField = this.view.getRandomFieldClickNpc(
          randomCoord,
          this.view.gameBoardNpc,
        );
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
    // Game can only start, if all ships are placed
    if (this.gameBoard.fleetPlayer1.length !== 5) return;
    // Render battle phase screen
    this.view.renderBattleScreen();
    // Place the npc ships on the game field
    this.initializeNpcShipPlacements();
    playSound("menu");
  }

  rotateShip(event) {
    const rotateBtn = event.target.closest(".btn-rotate");
    if (!rotateBtn) return;
    this.shipAxis = this.shipAxis === "X" ? "Y" : "X";
    // Control Sound
    playSound("menu");
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
    //Play sound on select
    playSound("select-ship");
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
      playSound("deploy-ship");
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
  async insertCoin() {
    if (!this.titleScreenMusic) {
      this.titleScreenMusic = new Audio(
        new URL("./assets/sounds/title-screen.mp3", import.meta.url),
      );

      this.titleScreenMusic.loop = true;
    }

    try {
      await this.titleScreenMusic.play();
    } catch (error) {
      console.warn("Playback failed:", error);
    }
    this.view.arcadeOverlay.classList.add("hidden");
  }

  init() {
    //Renders the Gameboard with axis, coordinates as Data-Attribute
    this.view.renderGameBoard(this.view.gameBoard);
  }

  resetShipPlacement() {
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
    this.view.clearShipClasses(this.view.gameBoard);
    //Make all ship units visible again
    this.view.showShipUnits();
    //Play sound on reset
    playSound("menu");
  }

  resetGame() {
    // Resets Placement phase
    this.resetShipPlacement();
    // Resets battle phase npc side
    this.view.clearShipClasses(this.view.gameBoardNpc);
    console.log("reset game");
    //Re render the ship placement screen
    this.view.renderShipPlacementScreen();
    // Reset the npc fleet
    this.gameBoard.fleetNpc = [];
    console.log(this.gameBoard.fleetNpc);
    //Play sound on reset
    const clickSound = new Audio("path/to/sound.mp3");
    clickSound.play();
  }

  startPreparation() {
    this.view.gameFrameCenter.classList.remove("hidden");
    this.view.titleScreen.classList.add("hidden");
    //Type narrator message
    this.view.renderNarratorMessage();
    this.titleScreenMusic.pause();
  }
}

export { GameController };
//Today Add Coin as cursor for the arcade overlay screen,
// Today second phase: Rework the prep screen, add sounds to the buttons, add hit and miss sounds when firing on ships, add sound when player wins, add sound when player lost,

//tomorrow hide ships from npc
// fix message not start again typing when reset => maybe set the p tag empty so it needs to render again, add random rendering messages when ship fires , change chip colors
