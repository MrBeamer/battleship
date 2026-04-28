class Ship {
  _hits = 0;
  _isSunk = false;
  constructor(length) {
    this.length = length;
  }

  hit() {
    ++this._hits;
  }

  isSunk() {
    this._isSunk = this._hits >= this.length;
  }
}
