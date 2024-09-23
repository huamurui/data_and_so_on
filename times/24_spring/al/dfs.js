// 求，数组的组合，C(n, m) 
const arr2 = [1,2,3,4,5,6,7,8,9,10]
const m = 3

function getCombination(arr, m) {
  const result = []
  function dfs(start, temp) {
    // 递归结束条件
    if (temp.length === m) {
      result.push(temp.slice())
      return
    }
    // 递归...for循环里面的递归，就是在这一个位置上，把所有的可能性都遍历一遍。具体是，把当前位置的元素放进temp，然后递归下一个位置，然后把当前位置的元素拿出来，然后再递归下一个位置。
    for (let i = start; i < arr.length; i++) {
      temp.push(arr[i])
      dfs(i+1, temp)
      temp.pop()
    }
  }
  dfs(0, [])
  return result
}
console.log(getCombination(arr2, m));



const num_char_map = {
  2: ['a','b','c'],
  3: ['d','e','f'],
  4: ['g','h','i'],
  5: ['j','k','l'],
  6: ['m','n','o'],
  7: ['p','q','r','s'],
  8: ['t','u','v'],
  9: ['w','x','y','z']
}

function getCharCombinations(digits) {
  let result = []
  let temp = []
  for (let i = 0; i < digits.length; i++) {
    temp.push(num_char_map[digits[i]])
  }
  // 字符串不定长度... 递归
  function dfs(temp, index, str) {
    if (index === temp.length) {
      result.push(str)
      return
    }
    for (let i = 0; i < temp[index].length; i++) {
      dfs(temp, index + 1, str + temp[index][i])
    }
  }
  dfs(temp, 0, '')
  return result
}



/* N queens */

function solveNQueens(n) {
  let result = []
  let board = Array.from({length: n}, () => Array.from({length: n}, () => '.'))
  function isValid(board, row, col) {
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < n; j++) {
        if (board[i][j] === 'Q' && (j === col || i + j === row + col || i - j === row - col)) {
          return false
        }
      }
    }
    return true
  }
  function dfs(board, row) {
    if (row === n) {
      result.push(board.map(item => item.join('')))
      return
    }
    for (let col = 0; col < n; col++) {
      if (isValid(board, row, col)) {
        board[row][col] = 'Q'
        dfs(board, row + 1)
        board[row][col] = '.'
      }
    }
  }
  dfs(board, 0)
  return result
}

console.log(solveNQueens(4));


function getTreeDepth(tree) {
  if (!tree) return 0
  let max = 0
  for (let i = 0; i < tree.children.length; i++) {
    max = Math.max(max, getTreeDepth(tree.children[i]))
  }
  return max + 1
}

const tree = {
  value: 1,
  children: [
    {
      value: 5,
      children: []
    },
    {
      value: 6,
      children: []
    },
    {
      value: 2,
      children: [
        {
          value: 3,
          children: []
        }
      ]
    },
    {
      value: 4,
      children: [

      ]
    }

  ]
}

// // 写一个上面的这个树的 dfs 遍历作为迭代器
// tree[Symbol.iterator] = function () {
//   let stack = [this]
//   return {
//     next() {
//       if (stack.length === 0) {
//         return {done: true}
//       }
//       let node = stack.pop()
//       if (node.children) {
//         for (let i = node.children.length - 1; i >= 0; i--) {
//           stack.push(node.children[i])
//         }
//       }
//       return {value: node.value, done: false}
//     }
//   }
// }

for (let value of tree) {
  console.log(value);
}

console.log(getTreeDepth(tree));



const fun = function (str) {
  const arr = str.split(' ');
  const trees = JSON.parse(arr[0]);
  const answer = JSON.parse(arr[1]);
  const root = trees[0]
  const result = []
  const path = []
  path.push(root.deptName)
  buildTree(root)
  dfs(root)
  console.log(result)

  function dfs(root) {
      for (let i = 0; i < answer.length; i++) {
          if (root.set.has(answer[i])) {
              result[i] = path.join('-')
          }
      }
      if (root.subDeptIds.length === 0) return
      for (let i = 0; i < root.children.length; i++) {
          path.push(root.children[i].deptName)
          dfs(root.children[i])
          path.pop()
      }
  }

  function buildTree(root) {
      root.set = new Set(root.memberIds)
      if (root.subDeptIds.length === 0) return
      root.children = []
      const set = new Set(root.subDeptIds)
      for (let i = 0; i < trees.length; i++) {
          if (set.has(trees[i].deptId)) {
              root.children.push(trees[i])
              buildTree(trees[i])
          }
      }

  }
}

fun('[{"deptId":1,"deptName":"总部","subDeptIds":[2,3],"memberIds":[1,2]},{"deptId":2,"deptName":"分部1","subDeptIds":[],"memberIds":[3,4,5]},{"deptId":3,"deptName":"分部2","subDeptIds":[4],"memberIds":[6,7,8]},{"deptId":4,"deptName":"分部4","subDeptIds":[],"memberIds":[9,10]}] [2,4,6,9]')