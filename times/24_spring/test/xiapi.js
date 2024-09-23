function lastUniqueChar(str) {
  // write code here
  // 统计每个字符出现的次数
  let chars_with_count = {}
  for (let i = 0; i < str.length; i++) {
    if (chars_with_count[str[i]]) {
      chars_with_count[str[i]]++
    } else {
      chars_with_count[str[i]] = 1
    }
  }

  // 找到次数为1的字符们
  let unique_chars = []
  for (let key in chars_with_count) {
    if (chars_with_count[key] === 1) {
      unique_chars.push(key)
    }
  }

  // 找到最后一个出现的字符
  let last_unique_char = ''
  for (let i = str.length - 1; i >= 0; i--) {
    if (unique_chars.includes(str[i])) {
      last_unique_char = str[i]
      break
    }
  }
  console.log(last_unique_char)
}

lastUniqueChar('abaccd')


function threeSumClosest(nums, target) {
  // write code here
  let min_diff = Infinity
  let closest_sum = 0
  nums.sort((a, b) => a - b)
  for (let i = 0; i < nums.length - 2; i++) {
    let left = i + 1
    let right = nums.length - 1
    while (left < right) {
      let sum = nums[i] + nums[left] + nums[right]
      let diff = Math.abs(sum - target)
      if (diff < min_diff) {
        min_diff = diff
        closest_sum = sum
      }
      if (sum < target) {
        left++
      } else if (sum > target) {
        right--
      } else {
        return sum
      }
    }
  }

  return closest_sum
}

// console.log(threeSumClosest([-1, 2, 1, -4], 1))

/**
 * Note: 类名、方法名、参数名已经指定，请勿修改
 *
 * 
 * 给你一个由 '1'（土地）和 '0'（海水）组成的的二维网格，请你计算网格中大陆的数量。
 * 大陆总是被水包围，并且每块大陆只能由水平方向和/或竖直方向上相邻的土地连接形成。
 * 此外，你可以假设该网格的四条边均被水包围。
 * @param grid string字符串 二维数组 用于表示 '1'（土地）和 '0'（海水）组成的的二维网格
 * @return int整型
 */

const grid = [
  ['1', '1', '1', '1', '0'],
  ['1', '1', '0', '1', '0'],
  ['1', '1', '0', '0', '0'],
  ['0', '0', '0', '0', '0']
]
function numOfLands(grid) {
  // write code here
  let count = 0
  let rows = grid.length
  let cols = grid[0].length
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === '1') {
        count++
        dfs(grid, i, j)
      }
    }
  }
  return count
}

function dfs(grid, i, j) {
  if (i < 0 || j < 0 || i >= grid.length || j >= grid[0].length || grid[i][j] === '0') {
    return
  }
  grid[i][j] = '0'
  dfs(grid, i + 1, j)
  dfs(grid, i - 1, j)
  dfs(grid, i, j + 1)
  dfs(grid, i, j - 1)
}

console.log(numOfLands(grid))



// 键值反转

function reverseKeyValues(obj) {
  // write code here
  let res = {}
  for (let key in obj) {
    if (res[obj[key]]) {
      res[obj[key]].push(key)
    } else {
      res[obj[key]] = [key]
    }
  }
  return res
}

// 二叉树的最大值

function maxInBinaryTree(root) {
  let max = -Infinity
  function dfs(node) {
    if (!node) {
      return
    }
    max = Math.max(max, node.val)
    dfs(node.left)
    dfs(node.right)
  }
  dfs(root)
  return max
}