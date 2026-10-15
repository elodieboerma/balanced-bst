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
    if (this.includes(value)) { return;}
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
}
