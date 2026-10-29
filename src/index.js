class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

function prettyPrint(node, prefix = "", isLeft = true) {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
}

class Tree {
  constructor(array) {
    this.array = array;
    this.root = null;
  }

  buildTree(array) {
    if (array.length === 0) {
      return null;
    }

    const mid = Math.floor(array.length / 2);
    const root = new Node(array[mid]);

    root.left = this.buildTree(array.slice(0, mid));
    root.right = this.buildTree(array.slice(mid + 1));
    return root;
  }

  includes(value) {
    const search = (node, value) => {
      if (node === null) {
        return false;
      }
      if (node.data === value) {
        return true;
      }
      if (value < node.data) {
        return search(node.left, value);
      } else {
        return search(node.right, value);
      }
    };
    return search(this.root, value);
  }

  insert(value) {
    if (this.includes(value)) {
      return;
    }
    const insertNode = (node, value) => {
      if (node === null) {
        return new Node(value);
      }
      if (value < node.data) {
        node.left = insertNode(node.left, value);
      } else if (value > node.data) {
        node.right = insertNode(node.right, value);
      }
      return node;
    };
    this.root = insertNode(this.root, value);
  }

  deleteItem(value) {
    const deleteNode = (node, value) => {
      if (node === null) {
        return null;
      }
      if (value < node.data) {
        node.left = deleteNode(node.left, value);
      } else if (value > node.data) {
        node.right = deleteNode(node.right, value);
      } else {
        // Node to be deleted found
        if (node.left === null && node.right === null) {
          return null; // No children
        } else if (node.left === null) {
          return node.right; // One child (right)
        } else if (node.right === null) {
          return node.left; // One child (left)
        } else {
          // Two children
          const minValueNode = this.findMin(node.right);
          node.data = minValueNode.data;
          node.right = deleteNode(node.right, minValueNode.data);
        }
      }
      return node;
    };

    this.root = deleteNode(this.root, value);
  }

  findMin(node) {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

  levelOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback parameter is required");
    }
    if (this.root === null) {
      return;
    }
    const queue = [this.root];
    while (queue.length > 0) {
      const node = queue.shift();
      callback(node.data);
      if (node.left !== null) {
        queue.push(node.left);
      }
      if (node.right !== null) {
        queue.push(node.right);
      }
    }
  }

  //left,root,right
  inOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback parameter is required");
    }
    const traverse = (node) => {
      if (node === null) return;
      traverse(node.left);
      callback(node.data);
      traverse(node.right);
    };
    traverse(this.root);
  }

  //root,left,right
  preOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback parameter is required");
    }
    const traverse = (node) => {
      if (node === null) return;
      callback(node.data);
      traverse(node.left);
      traverse(node.right);
    };
    traverse(this.root);
  }

  //left,right,root
  postOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback parameter is required");
    }
    const traverse = (node) => {
      if (node === null) return;
      traverse(node.left);
      traverse(node.right);
      callback(node.data);
    };
    traverse(this.root);
  }

  height(value) {
    const findNode = (node) => {
      if (node === null || node.data === value) {
        return node;
      }
      return value < node.data ? findNode(node.left) : findNode(node.right);
    };

    const target = findNode(this.root);
    if (target === null) {
      return undefined;
    }

    const measureHeight = (node) => {
      if (node === null) {
        return -1;
      }
      return 1 + Math.max(measureHeight(node.left), measureHeight(node.right));
    };

    return measureHeight(target);
  }

  depth(value) {
    let node = this.root;
    let depth = 0;

    while (node !== null) {
      if (node.data === value) {
        return depth;
      }
      node = value < node.data ? node.left : node.right;
      depth++;
    }

    return undefined;
  }

  isBalanced() {
    const checkHeight = (node) => {
      if (node === null) return 0;

      const leftHeight = checkHeight(node.left);
      if (leftHeight === -1) return -1;

      const rightHeight = checkHeight(node.right);
      if (rightHeight === -1 || Math.abs(leftHeight - rightHeight) > 1) {
        return -1;
      }

      return Math.max(leftHeight, rightHeight) + 1;
    };
    return checkHeight(this.root) !== -1;
  }

  rebalance() {
    const values = [];
    const collectInOrder = (node) => {
      if (node === null) {
        return;
      }
      collectInOrder(node.left);
      values.push(node.data);
      collectInOrder(node.right);
    };

    collectInOrder(this.root);
    this.root = this.buildTree(values);
  }
}

//driver code
const printAsList = (label, traverse) => {
  const values = [];
  traverse((value) => values.push(value));
  console.log(`${label}: [${values.join(", ")}]`);
};

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
console.log(`arr: ${arr}`);
const tree = new Tree(arr);
tree.root = tree.buildTree(arr);
prettyPrint(tree.root);

console.log(`isBalanced: ${tree.isBalanced()}`); //true
//print out all elements in level, pre, post, and in order
printAsList("level order", tree.levelOrderForEach.bind(tree));
printAsList("preorder", tree.preOrderForEach.bind(tree));
printAsList("postorder", tree.postOrderForEach.bind(tree));
printAsList("inorder", tree.inOrderForEach.bind(tree));
for (const value of [103, 234, 546, 782, 159]) {
  tree.insert(value);
}
console.log("Tree before rebalance:");
prettyPrint(tree.root);
console.log(`isBalanced: ${tree.isBalanced()}`); //false
tree.rebalance();
console.log("Tree after rebalance:");
prettyPrint(tree.root);
console.log(`isBalanced: ${tree.isBalanced()}`); //true
//print out all elements in level, pre, post, and in order
printAsList("level order", tree.levelOrderForEach.bind(tree));
printAsList("preorder", tree.preOrderForEach.bind(tree));
printAsList("postorder", tree.postOrderForEach.bind(tree));
printAsList("inorder", tree.inOrderForEach.bind(tree));

tree.deleteItem(10);
printAsList("array", tree.inOrderForEach.bind(tree));
console.log(`height of 9: ${tree.height(9)}`);
console.log(`depth of 9: ${tree.depth(9)}`);
