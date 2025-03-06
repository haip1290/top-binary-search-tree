export default class Node {
  constructor(data) {
    this._data = data;
    this._left = null;
    this._right = null;
  }

  get left() {
    return this._left;
  }

  set left(node) {
    this.validateNode(node);
    this._left = node;
  }

  get right() {
    return this._right;
  }

  set right(node) {
    this.validateNode(node);
    this._right = node;
  }

  get data() {
    return this._data;
  }

  set data(data) {
    this._data = data;
  }

  validateNode(node) {
    if (!(node instanceof Node) && node !== null) {
      throw new Error("Input must be a node");
    }
  }
}
