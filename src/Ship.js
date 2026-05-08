class Ship {
  _hits = 0;
  constructor(length, type, position) {
    this.length = length;
    this.type = type;
    this.position = position;
  }

  hit() {
    ++this._hits;
  }

  isSunk() {
    return this._hits >= this.length;
  }
}

export { Ship };
