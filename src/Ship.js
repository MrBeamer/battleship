class Ship {
  _hits = 0;
  constructor(length) {
    this.length = length;
  }

  hit() {
    ++this._hits;
  }

  isSunk() {
    return this._hits >= this.length;
  }
}

export { Ship };
