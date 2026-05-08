class Gameboard {
  permAllShips = [];
  fleetPlayer1 = [];
  fleetPlayer2 = [];
  shipPosition = null;
  // currentShip = [];
  constructor() {}
  // gets ships placement coordinates, where you hover over depending on length of the ship 1-3 fields from where the pointer is
  getTempShipCoords(gameField, shipLength) {
    let tempShipCoords = [];
    for (let i = 0; i < shipLength; i++) {
      let coordsSelected = i + parseInt(gameField.dataset.coordX);
      const coords = gameField.dataset.coordY + coordsSelected;
      tempShipCoords.push(coords);
    }
    // console.log(gameField);
    // console.log(gameField.dataset["coordX"]);
    // console.log(gameField.dataset["coordY"]);
    // console.log(tempShipCoords);
    this.shipPosition = tempShipCoords;
    return tempShipCoords;
  }

  getPermShipCoords(gameField) {
    const tempShipCoords = this.getTempShipCoords(gameField);
    this.permAllShips.push(tempShipCoords);
    console.log(this.permAllShips);
    return this.permAllShips;
  }

  placeShip(ship) {
    console.log(ship);
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
