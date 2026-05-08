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
  <img class="ship-sprite" src="${battleship}" alt="" />



  handleDragStart(event) {
    // gets ship length of selected ship and safe current ship length in the controller
    this.currentShipLength = event.target.dataset.shipLength;
    console.log(`Length of selected ship: ${this.currentShipLength}`);

    // Sets / adds the ship length to the current selected drag event (ship)
    event.dataTransfer.setData("shipLength", this.currentShipLength);

    //Remove offset
    const ship = event.target.closest(".ship-slot");
    event.dataTransfer.setDragImage(ship, 0, 0);

    // Clean up: restore pointer events to the ships
    document.querySelectorAll(".is-dragging").forEach((el) => {
      el.classList.remove("is-dragging");
    });
  }

  handlePointerDown(event) {
    event.preventDefault();
    console.log(event.target);
    // // gets ships placement coordinates
    const gameField = event.target.closest(".gameboard-field");
    if (!gameField) return;
    const shipLength = event.dataTransfer.getData("shipLength");
    console.log(`Length of dropped ship: ${shipLength}`);

    // Creates a new ship data entry
    //move to help or somewhere later
    const ship = new Ship(shipLength);
    console.log(ship);

    /// code from drop before

    // Get temp ship coords - mouseover
    const targetShipCoords = this.gameBoard.getTempShipCoords(
      gameField,
      shipLength,
    );
    // Gets the hoovered or locked in html of the fields
    const targetFields = this.view.getTargetFields(targetShipCoords);
    console.log(targetFields);
    console.log(`Coordinates of ship: ${targetShipCoords}`);
    // // Add class that highlights divs for potential ship placement
    targetFields.forEach((element) => {
      if (!element) return;
      console.log(element);
      element.classList.add("ship");
    });
  }

   handlePointerUp(event) {
    // // // gets ships placement coordinates
    // const gameField = event.target.closest(".gameboard-field");
    // if (!gameField) return;
    // const shipLength = event.target.dataset.shipLength;
    // console.log(`Length of dropped ship: ${shipLength}`);
    // // Creates a new ship data entry
    // //move to help or somewhere later
    // const ship = new Ship(shipLength);
    // console.log(ship);
    // /// code from drop before
    // // Get temp ship coords - mouseover
    // const targetShipCoords = this.gameBoard.getTempShipCoords(
    //   gameField,
    //   shipLength,
    // );
    // // Gets the hoovered or locked in html of the fields
    // const targetFields = this.view.getTargetFields(targetShipCoords);
    // console.log(`Coordinates of ship: ${targetShipCoords}`);
    // // // Add class that highlights divs for potential ship placement
    // targetFields.forEach((element) => {
    //   if (!element) return;
    //   console.log(element);
    //   element.classList.add("ship");
    // });
    // const gameField = event.target.closest(".gameboard-field");
    // if (!gameField) return;
    // I think I do not need this anymore because I know every ship that uses drop, is perma
    // this.view.currentTargetFields.forEach((element) => {
    //   if (!element) return;
    //   element.classList.add("ship-perma");
    // });
    // After Ship is dropped, get Permanent Ship Coords from the board
    // this.gameBoard.getPermShipCoords(gameField);
  }