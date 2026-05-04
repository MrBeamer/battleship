handleAddClass(event) {
    const length = 3;
    // gets ships placement coordinates
    const gameField = event.target.closest(".gameboard-field");
    if (!gameField) return;
    //
    // const arrShipCoords = [];
    // for (let i = 0; i < length; i++) {
    //   let coordsSelected = i + parseInt(gameField.dataset["coordX"]);
    //   console.log(coordsSelected);
    //   const coords = gameField.dataset["coordY"] + coordsSelected;
    //   console.log(coords);
    //   arrShipCoords.push(coords);
    // }
    // console.log(gameField);
    // console.log(gameField.dataset["coordX"]);
    // console.log(gameField.dataset["coordY"]);
    // console.log(arrShipCoords);

    const tempShipCoords = this.gameBoard.getShipCoordinates(gameField);
    // Searches the correct divs based on ships coordinates
    const shipDivs = tempShipCoords.map((coord) => {
      for (const field of this.view.gameBoard.children) {
        if (field.dataset.coords === coord) {
          console.log(field);
          return field;
        }
      }
    });


     getCoordinates(index) {
    const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];
    let calcIndex = Math.floor((index - 1) / 10);
    return letters[calcIndex];
    // if (index <= 10) return "A";
    // else if (index <= 20) return "B";
    // else if (index <= 30) return "C";
    // else if (index <= 40) return "D";
    // else if (index <= 50) return "E";
    // else if (index <= 60) return "F";
    // else if (index <= 70) return "G";
    // else if (index <= 80) return "H";
    // else if (index <= 90) return "I";
    // else if (index <= 100) return "J";
  }