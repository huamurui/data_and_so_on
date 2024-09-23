console.log('test')

// 如传入的数组元素为[123, "meili", "123", "mogu", 123]，则输出：[123, "meili", "123", "mogu"]
// 如传入的数组元素为[123, [1, 2, 3], [1, "2", 3], [1, 2, 3], "meili"]，则输出：[123, [1, 2, 3], [1, "2", 3], "meili"]
// 如传入的数组元素为[123, {a: 1}, {a: {b: 1}}, {a: "1"}, {a: {b: 1}}, "meili"]，则输出：[123, {a: 1}, {a: {b: 1}}, {a: "1"}, "meili"]

const arr1 = [123, "meili", "123", "mogu", 123]
const arr2 = [123, [1, 2, 3], [1, "2", 3], [1, 2, 3], "meili"]
const arr3 = [123, {a: 1}, {a: {b: 1}}, {a: "1"}, {a: {b: 1}}, "meili"]

function unique(arr) {
  const res = []
  const str_arr = arr.map(item => JSON.stringify(item))
  for (let i = 0; i < arr.length; i++) {
    if (str_arr.indexOf(JSON.stringify(arr[i])) === i) {
      res.push(arr[i])
    }
  }
  return res
}

console.log(unique(arr1))
console.log(unique(arr2))
console.log(unique(arr3))


function indexOf(arr, item, fromIndex = 0) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === item) {
      return i
    }
  }
  return -1
}


