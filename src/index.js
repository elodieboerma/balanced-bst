//be sure to always remove duplicate values or check for an existing value before inserting a new one

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

function prettyPrint(node, prefix = '', isLeft = true) {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
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
    }
    this.root = insertNode(this.root, value);
  }

  deleteItem(value) {
    if (!this.includes(value)) { return; }
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
          //not sure if this is correct
          // Two children
          const minValueNode = this.findMin(node.right);
          node.data = minValueNode.data;
          node.right = deleteNode(node.right, minValueNode.data);
        }
      }
      return node;
    }
  }

  findMin(node) {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

  levelOrderForEach(callback) {
    if (callback === null) {
        throw Error("Callback parameter is required");
    }
    if (this.root === null) {
      return;
    }
    const queue = [this.root];
    console.log(`this.root: ${this.root}`);
    console.log(`queue: ${queue}`);
    while (queue.length > 0) {
      const node = queue.shift();
      callback(node);
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
    if (callback === null) {
        throw Error("Callback parameter is required");
    }
    if (this.root === null) {
      return;
    }
    const queue = [this.root];
    //unsure if correct
    while (queue.length > 0) {
      const node = queue.shift();
      while (node.left !== null) {
        queue.push(node.left);
      }
      callback(node.data);
      if (node.right !== null) {
        queue.push(node.right);
      }
    }
  }

  //root,left,right
  preOrderForEach(callback) {
    if (callback === null) {
        throw Error("Callback parameter is required");
    }
    if (this.root === null) {
      return;
    }
    const queue = [this.root];
    //unsure if correct
    while (queue.length > 0) {
      const node = queue.shift();
      callback(node.data);
      if (node.left !== null && (node.left.left !== null || node.left.right !== null)) {
        queue.push(node.left);
      }
      if (node.right !== null && (node.right.left !== null || node.right.right !== null)) {
        queue.push(node.right);
      }
    }
  }

  //left,right,root
  postOrderForEach(callback) {
    if (callback === null) {
        throw Error("Callback parameter is required");
    }
    if (this.root === null) {
      return;
    }
    const queue = [this.root];
    //unsure if correct
    while (queue.length > 0) {
      const node = queue.shift();
      while (node.left !== null) {
        queue.push(node.left);
      }
      if (node.right !== null) {
        queue.push(node.right);
      }
      callback(node.data);
    }
  }

  height(value) {
    if (this.root === null || !this.includes(value)) { return undefined; }
    const queue = [value];
    let count = 0;
    while (queue.length > 0) {
        const curNode  = queue.shift();
        if (curNode.left !== null && curNode.right == null) {
            queue.push(curNode.left);
            count++;
        }
        if (curNode.left == null && curNode.right !== null) {
            queue.push(curNode.right);
            count++;
        }
        if (curNode.left != null && curNode.right != null) {
          queue.push(curNode.left);
          queue.push(curNode.right);
          count++;
        }
    }
    return count;
  }

  //unsure if correct
  //maybe use part of this?? 
  /*findMin(node) {
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }*/
  depth(value) {
    if (this.root === null || !this.includes(value)) { return undefined; }
    //const queue = [value];
    let count = 0;
    while (queue.length > 0) {
        /*const curNode  = queue.shift();
        if (curNode.left !== null && curNode.right == null) {
            queue.push(curNode.left);
            count++;
        }
        if (curNode.left == null && curNode.right !== null) {
            queue.push(curNode.right);
            count++;
        }*/
        const search = (node, value) => {
            if (node.data === value) {
                count++;
            }
            if (value < node.data) {
              count++
              return search(node.left, value);
            } else {
              count++
              return search(node.right, value);
            }
        };
    }
    return count;
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
const arr = [10,1,9,2,14,3,15,4,12,5,11,6,7,13,8]
console.log(`arr: ${arr}`);
const tree = new Tree(arr);
tree.root = tree.buildTree(arr);

console.log(`isBalanced: ${tree.isBalanced()}`); //true
//print out all elements in level, pre, post, and in order
console.log("level order:")
tree.levelOrderForEach(console.log);
console.log("pre order:")
tree.preOrderForEach(console.log);
console.log("post order:")
tree.postOrderForEach(console.log);
console.log("in order:")
tree.inOrderForEach(console.log);
arr.push(103,234,546,782,159); //unbalance tree
console.log(`edited randArr: ${arr}`);
console.log('Tree before rebalance:');
prettyPrint(tree.root);
console.log(`isBalanced: ${tree.isBalanced()}`); //false
tree.rebalance();
console.log('Tree after rebalance:');
prettyPrint(tree.root);
console.log(`isBalanced: ${tree.isBalanced()}`); //true
//print out all elements in level, pre, post, and in order
console.log("level order:")
tree.levelOrderForEach(console.log);
console.log("pre order:")
tree.preOrderForEach(console.log);
console.log("post order:")
tree.postOrderForEach(console.log);
console.log("in order:")
tree.inOrderForEach(console.log);
