// npcAttack() {
//     console.log("npc turn");
//     // True to start first while loop, when player misses then gets reassigned depending on npc hits or misses
//     let isHit = true;
//     while (isHit) {
//       const randomCoord = getRandomCoord();
//       // instead of human clicking on gameField (dataType is html element), this returns a random one
//       const randomShootingTargetField = this.view.getRandomFieldClickNpc(
//         randomCoord,
//         this.view.gameBoard,
//       );
//       isHit = this.processAttack(
//         randomShootingTargetField,
//         randomCoord,
//         this.gameBoard.fleetPlayer1,
//       );
//     }
//     // After miss shot, next players turn
//     console.log(this.gameBoard.fleetPlayer1);
//     this.toggleTurn();
//   }

//    shootNpcShip(event) {
//     // Makes sure that player only can shot, when it is his turn
//     if (!this.playerTurn) return;
//     // delete later
//     console.log("player turn");
//     const shootingTargetField = event.target.closest(".gameboard-field");
//     // Returns if field is undefined, clicked between lines
//     if (!shootingTargetField) return;
//     // Makes sure if player hit a ship field that it can not be targeted again
//     if (
//       shootingTargetField.classList.contains("hit") ||
//       shootingTargetField.classList.contains("miss")
//     )
//       return;
//     // Gets the coordinate from target
//     const targetCoord = shootingTargetField.dataset.coords;
//     const isHit = this.processAttack(
//       shootingTargetField,
//       targetCoord,
//       this.gameBoard.fleetNpc,
//     );
//     console.log(isHit);

//     if (!isHit) {
//       this.toggleTurn();
//       // after switching to npc he can attack, use timeout to have delay between player shot and npc shot
//       setTimeout(() => {
//         this.npcAttack();
//       }, 2000);
//     }
//   }

//      this.view.testtrtrtrdddfdfsdssdsds("We lost the battle, Captain. Better luck on the next voyage.");

//         for (let i = 1; i <= 100; i++) {
//       gameBoard.insertAdjacentHTML(
//         "beforeend",
//         `<div class="gameboard-field" data-coord-x="${getCoordinatesNumbers(i)}" data-coord-y="${getCoordinatesLetters(i)}" data-coords="${getCoordinatesLetters(i)}${getCoordinatesNumbers(i)}">${getCoordinatesLetters(i)}-${getCoordinatesNumbers(i)}</div>`,
//       );
//     }

this.view.rotateBtn.textContent = `Rotate Ship (${this.shipAxis === "Y" ? "X" : "Y"})`;
