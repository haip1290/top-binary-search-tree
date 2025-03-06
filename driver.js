import Tree from "./tree.js";

function generateArray(size = 10, limit = 100) {
  let numbersSet = new Set();
  while (numbersSet.size < size) {
    numbersSet.add(Math.floor(Math.random() * limit) + 1);
  }
  return Array.from(numbersSet).sort((a, b) => a - b);
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const getData = (node) => console.log(node.data);

const arr = generateArray(10);
console.log("Array", arr);

let tree = new Tree(arr);
prettyPrint(tree.root);
console.log("Is balanced: ", tree.isBalance(tree.root));
console.log("Level order:");
tree.levelOrder(getData);
console.log("post order:");
tree.postOrder(tree.root, getData);
console.log("pre order:");
tree.preOrder(getData);
console.log("in order:");
tree.inOrder(getData);
