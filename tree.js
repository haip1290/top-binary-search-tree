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

  insert(value) {
    const newNode = new Node(value);
    if (this.root === null) {
      this.root = newNode;
      return;
    }
    if (value === this.root.data) {
      return;
    }
    let parent = null;
    let current = this.root;
    while (current !== null) {
      parent = current;
      if (current.data < value) {
        current = current.right;
      } else if (current.data > value) {
        current = current.left;
      } else {
        return;
      }
    }
    if (parent.data > value) {
      parent.left = newNode;
    } else {
      parent.right = newNode;
    }
  }

  findSuccessor(node) {
    if (node === null) {
      return null;
    }
    node = node.right;
    while (node !== null && node.left !== null) {
      node = node.left;
    }
    return node;
  }

  delete(root, value) {
    if (root === null) return root;
    if (root.data < value) {
      root.right = this.delete(root.right, value);
    } else if (root.data > value) {
      root.left = this.delete(root.left, value);
    } else {
      if (root.left === null) {
        return root.right;
      }
      if (root.right === null) {
        return root.left;
      }
      let successor = this.findSuccessor(root);
      root.data = successor.data;
      root.right = this.delete(root.right, successor.data);
    }
    return root;
  }

  find(value) {
    let current = this.root;
    while (current !== null) {
      if (current.data < value) {
        current = current.right;
      } else if (current.data > value) {
        current = current.left;
      } else {
        return current;
      }
    }
    return null;
  }
}
