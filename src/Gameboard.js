class Gameboard {
  permAllShips = [];
  // currentShip = [];
  constructor() {}
  // gets ships placement coordinates, where you hover over depending on length of the ship 1-3 fields from where the pointer is
  getTempShipCoords(gameField) {
    let tempShipCoords = [];
    const length = 3;
    for (let i = 0; i < length; i++) {
      let coordsSelected = i + parseInt(gameField.dataset["coordX"]);
      // console.log(coordsSelected);
      const coords = gameField.dataset["coordY"] + coordsSelected;
      // console.log(coords);
      tempShipCoords.push(coords);
    }
    // console.log(gameField);
    // console.log(gameField.dataset["coordX"]);
    // console.log(gameField.dataset["coordY"]);
    // console.log(tempShipCoords);
    return tempShipCoords;
  }

  getPermShipCoords(gameField) {
    const tempShipCoords = this.getTempShipCoords(gameField);
    this.permAllShips.push(tempShipCoords);
    console.log(this.permAllShips);
    return this.permAllShips;
  }

  getCoordinates(index) {
    const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];
    let calcIndex = Math.floor((index - 1) / 10);
    return letters[calcIndex];
  }

  placeShip(ship, coordinates) {}
}

export { Gameboard };
