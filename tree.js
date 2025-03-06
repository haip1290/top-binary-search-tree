import Node from "./node.js";

export default class Tree {
  constructor(arr) {
    this._arr = arr;
    this._root = this.buildTree(arr);
  }

  get root() {
    return this._root;
  }

  buildTree(arr) {
    let end = arr.length;
    if (end === 0) return null;
    // push root into queue
    let mid = Math.floor((end - 1) / 2);
    let root = new Node(arr[mid]);
    let queue = [{ node: root, range: [0, end - 1] }];
    let frontIndex = 0;
    // process queue until last node
    while (frontIndex < queue.length) {
      let front = queue[frontIndex];
      let node = front.node;
      let [start, end] = front.range;
      let index = start + Math.floor((end - start) / 2);
      //if there is left branch, push in mid left node into q
      if (start < index) {
        let midLeft = start + Math.floor((index - 1 - start) / 2);
        let left = new Node(arr[midLeft]);
        node.left = left;
        queue.push({ node: left, range: [start, index - 1] });
      }
      // if there is right branch, push in mid right node
      if (end > index) {
        let midRight = index + 1 + Math.floor((end - 1 - index) / 2);
        let right = new Node(arr[midRight]);
        node.right = right;
        queue.push({ node: right, range: [index + 1, end] });
      }
      frontIndex++;
    }
    return root;
  }
}
