import Node from "./node.js";

export default class Tree {
  constructor(arr) {
    this._arr = arr;
    this._root = this.buildTree(arr);
  }

  get root() {
    return this._root;
  }

  set root(node) {
    if (!(node instanceof Node)) {
      throw new Error("Input must be node");
    }
    this._root = node;
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
    while (current) {
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

  levelOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback function is required");
    }

    if (this.root === null) {
      return;
    }
    let queue = [this.root];
    let i = 0;
    while (i < queue.length) {
      let current = queue[i++];
      callback(current);
      if (current.left !== null) {
        queue.push(current.left);
      }
      if (current.right !== null) {
        queue.push(current.right);
      }
    }
  }

  levelOrderRecursive(callback) {
    if (typeof callback !== "function") {
      throw Error("Callback function is required");
    }
    if (this.root === null) {
      return;
    }
    const processLevel = (nodes) => {
      if (nodes.length === 0) return;
      let queue = [];
      for (const node of nodes) {
        callback(node);
        if (node.right !== null) queue.push(node.right);
        if (node.left !== null) queue.push(node.left);
      }
      processLevel(queue);
    };
    processLevel([this.root]);
  }

  height(node) {
    if (node === null) return 0;
    return 1 + Math.max(this.height(node.left), this.height(node.right));
  }

  levelOrderRecursiveVer2(callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback function is required");
    }
    const height = this.height(this.root);
    for (let index = 1; index <= height; index++) {
      processLevel(this.root, index, callback);
    }

    function processLevel(node, level, callback) {
      if (node === null) return;
      if (level === 1) {
        callback(node);
      } else {
        processLevel(node.left, level - 1, callback);
        processLevel(node.right, level - 1, callback);
      }
    }
  }

  inOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback must be function");
    }
    let current = this.root;
    let stack = [];
    while (current !== null || stack.length > 0) {
      while (current != null) {
        stack.push(current);
        current = current.left;
      }
      current = stack.pop();
      callback(current);
      current = current.right;
    }
  }

  inOrderRecursive(node, callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback must be function");
    }
    if (node === null) return;
    let current = node;

    if (current.left !== null) this.inOrderRecursive(current.left, callback);
    callback(current);
    if (current.right !== null) this.inOrderRecursive(current.right, callback);
  }

  preOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback must be function");
    }
    let current = this.root;
    let stack = [];
    if (current !== null) {
      stack.push(current);
    }
    while (stack.length > 0) {
      current = stack.pop();
      callback(current);
      if (current.right !== null) {
        stack.push(current.right);
      }
      if (current.left !== null) {
        stack.push(current.left);
      }
    }
  }

  postOrder(node, callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback must be function");
    }
    if (node === null) return;
    let current = node;
    this.postOrder(current.left, callback);
    this.postOrder(current.right, callback);
    callback(current);
  }
  depth(node) {
    let depth = 0;
    let current = this.root;
    while (current !== null) {
      if (current.data < node.data) {
        current = current.right;
        depth++;
      } else if (current.data > node.data) {
        current = current.left;
        depth++;
      } else {
        return depth;
      }
    }
    return -1;
  }
  isBalance(node) {
    if (node === null) return true;
    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);
    return (
      Math.abs(leftHeight - rightHeight) <= 1 &&
      this.isBalance(node.left) &&
      this.isBalance(node.right)
    );
  }

  rebalance() {
    let arr = [];
    const createArr = (node) => arr.push(node.data);
    this.inOrder(createArr);
    this.root = this.buildTree(arr);
  }
}
