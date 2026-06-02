class Gameboard {
  fleetPlayer1 = [];
  fleetNpc = [];
  constructor() {}
  // gets ships placement coordinates, where you hover over depending on length of the ship 1-3 fields from where the pointer is, switches between X and Y placement
  getTempShipCoords(gameField, shipLength, shipAxis) {
    let tempShipCoords = [];
    let coords = null;
    for (let i = 0; i < shipLength; i++) {
      if (shipAxis === "X") {
        let coordX = i + parseInt(gameField.dataset.coordX);
        let coordY = gameField.dataset.coordY;
        // This checks if coordinate is within the gameBoard
        if (coordX > 10) coordX = undefined;
        coords = coordY + coordX;
      } else {
        let coordX = parseInt(gameField.dataset.coordX);
        let coordY = gameField.dataset.coordY;
        // Turns letter into charCode to then increase the code to get next letter from the board, then transform code back to string
        coordY = String.fromCharCode(i + coordY.charCodeAt(0));
        coords = coordY + coordX;
      }
      tempShipCoords.push(coords);
    }
    return tempShipCoords;
  }

  placeShip(ship) {
    this.fleetPlayer1.push(ship);
  }
}

export { Gameboard };
