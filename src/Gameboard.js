class Gameboard {
  fleetPlayer1 = [];
  fleetPlayer2 = [];
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
      // console.log(`Coord Y: ${coordY}`);
      // console.log(`Coord X: ${coordX}`);
    }
    return tempShipCoords;
  }

  placeShip(ship) {
    // add later logic if players 1 turn put into fleet1 and vice versa
    this.fleetPlayer1.push(ship);
  }

  getCoordinatesLetters(index) {
    const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];
    let calcIndex = Math.floor((index - 1) / 10);
    return letters[calcIndex];
  }

  getCoordinatesNumbers(index) {
    if (index % 10 === 0) return 10;
    else return index % 10;
  }
}

export { Gameboard };
