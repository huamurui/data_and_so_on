const word = 'XxxXX'
// XXXX, Xxxxxx, xxxx 为合法单词，即首字母大写或全部都为大写或小写的单词
const char_arr = word.split('')
let min_op_count = 0

// 求最小操作次数，使得单词符合要求

// 1. 首字母大写
let upper_count = 0
let lower_count = 0
let first_upper = false

for (let i = 0; i < char_arr.length; i++) {
  if (char_arr[i] === char_arr[i].toUpperCase()) {
    upper_count++
    if (i === 0) {
      first_upper = true
    }
  } else {
    lower_count++
  }
}

// 改为首字母大写所需操作次数,改为全部大写所需操作次数,改为全部小写所需操作次数
let count1, count2, count3

if (first_upper) {
  count1 = upper_count - 1
  count2 = lower_count
  count3 = upper_count
} else {
  count1 = upper_count
  count2 = lower_count
  count3 = upper_count + 1
}

min_op_count = Math.min(count1, count2, count3)

console.log(min_op_count)



// 小美拿到了一个数组，她每次操作会将除了第x个元素的其余元素翻倍，一共操作了q次。请你帮小美计算操作结束后所有元素之和。

// 第一行输入两个正整数n,q，代表数组的大小和操作次数。
// 第二行输入n个正整数a_i，代表数组的元素。
// 接下来的q行，每行输入一个正整数x_i，代表第i次操作未被翻倍的元素。

const [n,q] = [3,2]
let arr = [1,2,3]
for(let i = 0;i<q;i++){
    let x = 2
    arr = arr.map((j,index)=>index+1==x?j:j*2)
    console.log(arr)
}
console.log(arr.reduce((a,b)=>a+b))



