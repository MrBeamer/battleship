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

      // I think can removed also because no ship function delete
      // UI - Places ship
      this.view.currentTargetFields.forEach((field) => {
        if (!field) return;
        // Lookup correct ship class, to color field in the ship color
        const shipTypeClass = lookUpShipType(ship.type);
        // replace later one with other class, because should be hidden and only visible on hit
        // field.classList.add("placed", shipTypeClass);
        //testing
        field.classList.add("placed");
      });

      // Data: Update ship with coordinates and axis
      ship.position = selectedShipCoords;
      ship.axis = randomShipAxis;

      // Push the updated ship into the fleet array
      this.gameBoard.fleetNpc.push(ship);
    }); // end of ship for each currently
    console.log(this.gameBoard.fleetNpc);
    // console.log(this.view.currentTargetFields);
  }