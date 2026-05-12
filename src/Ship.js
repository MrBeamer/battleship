class Ship {
  _hits = 0;
  constructor(length, type, position, axis) {
    this.length = length;
    this.type = type;
    this.position = position;
    this.axis = axis;
  }

  hit() {
    ++this._hits;
  }

  isSunk() {
    return this._hits >= this.length;
  }
}

export { Ship };
