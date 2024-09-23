
const tree_arr = [
  { id: 1, pid: null, name: "a" },
  { id: 2, pid: 1, name: "b" },
  { id: 3, pid: 1, name: "c" },
  { id: 4, pid: 2, name: "d" },
  { id: 5, pid: 2, name: "e" },
  { id: 6, pid: 3, name: "f" },
];

function getTree(arr) {
  let map = {};
  let result = [];
  // 构建map
  arr.forEach((item) => {
    map[item.id] = item;
  });
  arr.forEach((item) => {
    // 这里是关键，找到父节点，挂载到父节点的children上...
    // 感觉这是种，...利用对象是引用类型的，直接修改了map中的值...而没有创建新的对象
    let parent = map[item.pid];
    if (parent) {
      if (!parent.children) {
        parent.children = [];
      }
      parent.children.push(item);
    } else {
      // root node，没有父节点
      result.push(item);
    }
  });
  return result;
}

// tree => list

function getTreeList(tree) {
  let result = [];
  function dfs(tree) {
    if (tree) {
      result.push(tree);
      if (tree.children) {
        tree.children.forEach((child) => {
          dfs(child);
        });
      }
    }
  }
  dfs(tree);
  return result;
}
// 这样修改引用的做法...emmm 很难评... 算是巧

// 还有一种题是，找到 list 中所有的完整的路径

function getTreePath(tree) {
  let result = [];
  function dfs(tree, path) {
    if (tree) {
      path.push(tree.name);
      if (!tree.children) {
        result.push(path.join("/"));
      } else {
        tree.children.forEach((child) => {
          dfs(child, path.slice());
        });
      }
    }
  }
  dfs(tree, []);
  return result;
}

// arr to chain
const chain_arr = [
  { id: 1, name: "a", pid: null },
  { id: 2, name: "b", pid: 1 },
  { id: 4, name: "d", pid: 2 },
];

function ListNode(val) {
  this.val = val;
  this.next = null;
}

function getChain(arr) {
  // parse arr to ListNodes and return the head
  let head = new ListNode(arr[0].name);
  let current = head;
  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i].name);
    current = current.next;
  }
  return head;
}
console.log(getChain(chain_arr));

const the_list = [
  {
    id: 1,
    name: "a",
    children: [2, 3],
  },
  {
    id: 2,
    name: "b",
    children: [4, 5],
  },
  {
    id: 3,
    name: "c",
    children: [6],
  },
  {
    id: 4,
    name: "d",
  },
  {
    id: 5,
    name: "e",
  },
  {
    id: 6,
    name: "f",
  },
];

function getAllFullPaths(list) {
  // get all full paths..嗯，list 的每个元素都是一个对象，有id，name，children，children是一个数组，里面是id，表示这个元素的子元素，id是唯一的，如果没有子元素，children是undefined或者[]
  // 因为 children 存的只是 ids... 并且 list 是数组...所以需要一个map来存储id和对应的对象
  // 然后，因为是列表不是树，

  // 先找到 children是undefined或者[] 的元素，因为这些其实是叶子节点，,也是所有的完整路径的起点，然后，从这些叶子节点开始，找到他们的父节点，然后再找到父节点的父节点...直到根节点结束，这样就找到了一条完整的路径

  const result = [];

  const starts = list.filter((item) => !item.children);
  starts.forEach((start) => {
    let current = start;
    let path = [current.name];
    // while (current) {
    //   let parent = list.find(
    //     (item) => item.children && item.children.includes(current.id)
    //   );
    //   if (parent) {
    //     path.unshift(parent.name);
    //     current = parent;
    //   } else {
    //     current = null;
    //   }
    // }

    const find = (current) => {
      if(!current) return;
      let parent = list.find(
        (item) => item.children && item.children.includes(current.id)
      );
      if (parent) {
        path.unshift(parent.name);
        find(parent);
      }
    }
    find(start);

    result.push(path.join("/"));
  });
  return result;
}
console.log(getAllFullPaths(the_list));

// 数组交集
const getIntersection = (arr1, arr2) =>
  arr1.filter((item) => arr2.includes(item));
const getIntersection2 = (arr1, arr2) =>
  arr1.filter((item) => arr2.indexOf(item) > -1);
console.log(getIntersection([1, 2, 3, 4, 5], [3, 4, 5, 6, 7]));

// 数组展平

const flatten = (arr) =>
  arr.reduce(
    (acc, item) => acc.concat(Array.isArray(item) ? flatten(item) : item),
    []
  );
console.log(flatten([1, 2, [3, 4, [5, 6]]]));


// 合法括号

const isValid = (s) => {
  let stack = [];
  let map = {
    "(": ")",
    "[": "]",
    "{": "}",
  };
  for (let i = 0; i < s.length; i++) {
    if (map[s[i]]) {
      stack.push(s[i]);
    } else if (s[i] !== map[stack.pop()]) {
      return false;
    }
  }
  return stack.length === 0;
}



let a = "9007199254740991";
let b = "1234567899999999999";

function add(a ,b){
   //取两个数字中最大长度， b 比 a 长，maxLength 就是 b 的 length
   let maxLength = Math.max(a.length, b.length);
   //padStart(targetLength,padString)
   //targetLength 即补齐后的目标长度，padString 即填充字符串
   //用 0 去补齐长度
   a = a.padStart(maxLength , 0); //结果 "0009007199254740991"
   b = b.padStart(maxLength , 0); //结果 "1234567899999999999"
   //声明加法过程中需要用到的变量
   let t = 0;
   let f = 0;   //"进位"
   let sum = ""; // sum 声明为空字符串
   // 从个位数开始遍历数字
   for(let i=maxLength-1 ; i>=0 ; i--){
      t = parseInt(a[i]) + parseInt(b[i]) + f;
      // 取地板数，比如 9/10 取 0， 11/10 取 1
      f = Math.floor(t/10);
      // 取模，个位数与 10 取模为它本身，即余数
      // 因为 sum 声明为空字符串，所以数字会被转换成字符串
      // 比如 8 + "9" 输出为字符串 "89"
      sum = t%10 + sum;
   }
   //最后得到的 sum 时， f 为 1 即在前加 1
   //假设此时 sum 为 "xxx", f 为 1，则返回"1xxx"
   if(f == 1){
      sum = "1" + sum;
   }
   return sum;
}

// 验证
add(a ,b); //结果为：1243575099254740990

// call 怎么实现
Function.prototype.myCall = function(context) {
  context = context || window;
  context.fn = this;
  let args = [...arguments].slice(1);
  let result = context.fn(...args);
  delete context.fn;
  return result;
}