// 假设一款游戏有n关，记为0~n-1，通关顺序记录在一个数组preLevels里，其中preLevels[i] = [ai, bi]，表示如果想通过ai关，必须先通过bi关。
// 例如：n=2，preLevels=[[1, 0]]， 表示一共有2关，记为0、1；想通过第1关，必先通过第0关。
// 请你实现一个函数，以数组的形式返回通过这款游戏的通关顺序，可能有多种顺序，返回任意一种即可，如果不能通过，返回空数组

/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 *
 * 
 * @param n int整型 
 * @param preLevels int整型二维数组 
 * @return int整型一维数组
 */
function getLevels( n ,  preLevels ) {
  // write code here
  const map = new Map()
  for (let i = 0; i < preLevels.length; i++) {
    const [a, b] = preLevels[i]
    if (!map.has(a)) {
      map.set(a, [])
    }
    map.get(a).push(b)
  }
  // 嗯..是不是这里的 visited 有点问题，如果是全新的一次尝试，visited 应该是空的
  const res = []
  const visited = new Set()
  const dfs = (node) => {
    if (visited.has(node)) {
      return
    }
    visited.add(node)
    if (map.has(node)) {
      for (const next of map.get(node)) {
        dfs(next)
      }
    }
    res.push(node)
  }
  for (let i = 0; i < n; i++) {
    dfs(i)
  }
  return res
}

console.log(getLevels(2, [[1, 0]])) // [0, 1]
console.log(getLevels(3, [[1, 0], [2, 1]])) // [0, 1, 2]
console.log(getLevels(1, [])) // [0]
console.log(getLevels(3, [[1, 0], [2, 1], [0, 2]])) // [2, 0, 1]

// 还有两个送的。
// 一道是 url 里的参数解析，下划线改驼峰
// 一道是统计字符串里字符出现的次数
