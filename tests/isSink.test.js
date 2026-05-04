import { Ship } from "../src/Ship.js";

describe("Ship module", () => {
  test("if hits equal ship length, isSunk return true", () => {
    const ship = new Ship(1);
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
  test("if hit is called, hits increment", () => {
    const ship = new Ship(2);
    ship.hit();
    expect(ship._hits).toBe(1);
  });
});
