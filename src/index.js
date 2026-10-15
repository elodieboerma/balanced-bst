//be sure to always remove duplicate values or check for an existing value before inserting a new one

import "./styles.css";

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.array = array;
    this.root = null;
  }

  buildTree(array) {
    if (array.length === 0 || array[0] > array[array.length - 1]) {
      return null;
    }

    const mid = Math.floor(array.length / 2);
    const root = new Node(array[mid]);

    root.left = this.buildTree(array.slice(0, mid));
    root.right = this.buildTree(array.slice(mid + 1));

    const prettyPrint = (node, prefix = '', isLeft = true) => {
        if (node === null || node === undefined) {
            return;
        }

        prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    };

    prettyPrint(root);

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
    if (!this.includes(value)) { return;}
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
    //should be passing value as argument, not node - is it correct?
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
}
