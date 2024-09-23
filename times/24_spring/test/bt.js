// 长为 2n 的数组中每两个元素组成一个二元组(x,y)，表示坐标轴中的一个点

// 然后找一个矩形，将所有的点包括在内，求可能的这样矩形的最小面积

const arr = [1,2,3,4,5,6,7,8]

function minAreaRect0(arr){
  const sorted_arr = arr.sort((a,b)=>a-b)
  let x_min = sorted_arr[0]
  let x_max = sorted_arr[arr.length-1]
  let y_min = sorted_arr[arr.length/2]
  let y_max = sorted_arr[arr.length/2-1]
  let min = (x_max-x_min)*(y_max-y_min)

  // 滑动一下...
  // 总之这个题不难，或者说和数据结构算法之类的知识关系不大，想一想其实，也可能能想出来的。所谓的...思维题。
  return min
}


// 计时

console.log(minAreaRect0(arr))
