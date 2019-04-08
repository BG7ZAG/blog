function BinaryTree(item = '') {
    const Node = function (key) {
        this.key = key;
        this.left = null;
        this.right = null;
    };

    let root = null;

    const insertNode = function (node, newNode) {
        if ((item ? newNode.key[item] : newNode.key) < (item ? node.key[item] : node.key)) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                insertNode(node.left, newNode);
            }
        } else {
            if (node.right === null) {
                node.right = newNode;
            } else {
                insertNode(node.right, newNode);
            }
        }
    }

    this.insert = function (key) {
        let newNode = new Node(key);
        if (root === null) {
            root = newNode;
        } else {
            insertNode(root, newNode)
        }
    };

    const inOrderTraverseNode = function (node, callback) {
        if (node !== null) {
            inOrderTraverseNode(node.left, callback);
            callback(node.key);
            inOrderTraverseNode(node.right, callback);
        }
    }

    // 中序遍历
    this.inOrderTraverse = function (callback) {
        inOrderTraverseNode(root, callback);
    }

    const preOrderTraverseNode = function (node, callback) {
        if (node !== null) {
            callback(node.key);
            preOrderTraverseNode(node.left, callback);
            preOrderTraverseNode(node.right, callback);
        }
    }

    // 前序遍历
    this.preOrderTraverse = function (callback) {
        preOrderTraverseNode(root, callback);
    }


    const postOrderTraverseNode = function (node, callback) {
        if (node !== null) {
            postOrderTraverseNode(node.left, callback);
            postOrderTraverseNode(node.right, callback);
            callback(node.key);
        }
    }

    // 后序遍历
    this.postOrderTraverse = function (callback) {
        postOrderTraverseNode(root, callback);
    }

    const minNode = function (node) {
        if (node) {
            while (node && node.left !== null) {
                node = node.left;
            }
            return node.key;
        }
        return null;
    }

    // 二叉树节点查找
    this.min = function () {
        return minNode(root);
    }

    const maxNode = function (node) {
        if (node) {
            while (node && node.right !== null) {
                node = node.right;
            }
            return node.key;
        }
        return null;
    }
    this.max = function () {
        return maxNode(root);
    }

    const searchNode = (node, key) => {
        if (node === null) {
            return false;
        }

        if (key < node.key) {
            return searchNode(node.left, key);
        } else if (key > node.key) {
            return searchNode(node.right, key);
        } else {
            return true;
        }
    }
    this.search = function (key) {
        return searchNode(root, key);
    }

    // 删除叶子节点
    const findMinNode = node => {
        if (node) {
            while (node && node.left !== null) {
                node = node.left;
            }
            return node;
        }
    }
    const removeNode = (node, key) => {
        if (node === null) {
            return null;
        }
        if (key < node.key) {
            node.left = removeNode(node.left, key);
            return node;
        } else if (key > node.key) {
            node.right = removeNode(node.right, key);
            return node;
        } else {
            if (node.left === null && node.right === null) {
                node = null;
                return node;
            }
            if (node.left === null) {
                node = node.right;
                return node;
            } else if (node.right === null) {
                node = node.left;
                return node;
            }

            let aux = findMinNode(node.right);
            node.key = aux.key;
            node.right = removeNode(node.right, aux.key);
            return node;
        }
    }

    this.remove = function (key) {
        root = removeNode(root, key);
    }
}

let nodes1 = [8, 3, 10, 1, 6, 14, 4, 7, 13];
let nodes = [{
            id: 1,
            num: 34,
        },{
            id: 2,
            num: 2,
        },{
            id: 3,
            num: 4566,
        },{
            id: 4,
            num: 23,
        },];

// 如果nodes数组中的元素为对象，则传入对象中需要比较的key，类型为String; 如果为 nodes1 则不用传值
let binaryTree = new BinaryTree('num'); 
nodes.forEach(key => {
    binaryTree.insert(key)
});

let callback = function (key) {
    console.log(key);
}

binaryTree.inOrderTraverse(callback);
console.log('---------')
binaryTree.preOrderTraverse(callback);
console.log('---------')
binaryTree.postOrderTraverse(callback);
console.log('---------')
console.log('二叉树查找最小值:' + binaryTree.min());
console.log('二叉树查找最大值:' + binaryTree.max());
console.log(binaryTree.search(7) ? 'key 7 is found' : 'key 7 is not found');
console.log(binaryTree.search(9) ? 'key 9 is found' : 'key 9 is not found');
binaryTree.remove(3);
