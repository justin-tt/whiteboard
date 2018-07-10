// given a binary tree (represented using a linked list with left/right nodes)
// write a function that takes in the root node, and returns an array with the
// right most possible leaf
//          1
//     2         3
//  4   5       6 7
//             8
//  should return [1,3,7,8]
const assert = require('assert');

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  setLeft(node) {
    this.left = node;
  }
  
  setRight(node) {
    this.right = node;
  }
}

let n1 = new Node(1);
let n2 = new Node(2);
let n3 = new Node(3);
let n4 = new Node(4);
let n5 = new Node(5);
let n6 = new Node(6);
let n7 = new Node(7);
let n8 = new Node(8);

n1.setLeft(n2);
n1.setRight(n3);

n2.setLeft(n4);
n2.setRight(n5);

n3.setLeft(n6);
n3.setRight(n7);

n6.setLeft(n8);

assert.equal(n1.left.left, n4);

const findRightNodes = function findRightNodes(node) {
  let result = [node.value];
  let a = [node];
  let b = [];

  while (a.length !== 0) {
    a.forEach(node => {
      if (node.left) { b.push(node.left); };
      if (node.right) { b.push(node.right); };
    });
    if (b.length > 0) {
      result.push(b[b.length-1].value);
    }
    a = b;
    b = []
  }

  return result;

};


assert.deepEqual(findRightNodes(n1), [1,3,7,8]);
