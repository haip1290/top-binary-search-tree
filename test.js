import Tree from "./tree.js";

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

let arr = [1, 5, 13, 24];
let tree = new Tree(arr);
let root = tree.root;

prettyPrint(root);

tree.insert(5);
tree.insert(7);
tree.insert(16);
tree.insert(2);
prettyPrint(root);

prettyPrint(tree.find(13));
prettyPrint(tree.find(1));
prettyPrint(tree.find(22));

prettyPrint(root);
tree.delete(tree.root, 13);
prettyPrint(root);

console.log("Iterative level order:");
tree.levelOrder(prettyPrint);

console.log("Recursive level order:");
tree.levelOrderRecursive(prettyPrint);

console.log("Height of tree", tree.height(root));

let tree2 = new Tree([1, 2, 5, 6, 13, 17, 22, 33, 44]);
prettyPrint(tree2.root);
console.log("Height of tree", tree2, tree2.height(tree2.root));

console.log("Recursive ver 2:");
tree2.levelOrderRecursiveVer2(prettyPrint);
