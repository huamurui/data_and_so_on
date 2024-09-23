// distance 是一个数组，表示，从起点出发，向上，左，下，右，走的步数
// 请问，从起点出发，走到终点，distance 所表示的路线，是否成环

const distance = [2,4,5,1]

function isCircle( distance ) {
  // write code here
  let x = 0, y = 0;
  for (let i = 0; i < distance.length; i++) {
    if (i % 4 === 0) {
      y += distance[i];
    } else if (i % 4 === 1) {
      x -= distance[i];
    } else if (i % 4 === 2) {
      y -= distance[i];
    } else {
      x += distance[i];
    }
  }
  return x === 0 && y === 0;
}


// 字符串，找它的子序列，满足首位和末位字符相同即可，返回满足条件的子序列个数
// 子序列：字符串的子序列是由原字符串删除一些字符（也可以不删除）后，不改变剩余字符的相对顺序而形成的新字符串

function countSubsequence( s ) {
  // write code here
  let res = 0;
  let map = new Map();
  for (let i = 0; i < s.length; i++) {
    if (map.has(s[i])) {
      res += map.get(s[i]);
    }
    map.set(s[i], (map.get(s[i]) || 0) + 1);
  }
  return res;
}
