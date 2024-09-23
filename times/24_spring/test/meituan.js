// questions 里有很多区间，用数组表示区间的左右边界，比如 [1,2] 表示 1 到 2 的区间，
// 一个正整数数组，其中为 0 的元素表示未确定，可以替换成 questions 中区间包含的数字，替换后求和，给出可能的最大值和最小值。
// arr.length, questions.length 在 1 到 10^5 之间, 数字在 1 到 10^9 之间。

const questions = [
  [1,2],
  [2,4],
  [3,5],
  [1,6]
]
const arr0 = [3,4,9,0,2,0,2,10]

let base = 0;
let count = 0;
for (let i = 0; i < arr0.length; i++) {
  if (!arr0[i]) {
      count++
  } else {
      base+=arr0[i]
  }
}
// 这个 base 是不是不会变.txt
// 数量级一下少了好多...

for (let i = 0; i < questions.length; i++) {
    const [l,r] = questions[i]
    // console.log(count*l+base, count*r+base);
}



/* 
2.
*/

const arr =  [
  [ '1', '0', '1', '0' ],
  [ '0', '1', '0', '1' ],
  [ '1', '1', '0', '0' ],
  [ '0', '0', '1', '1' ]
]

// 由 0,1组成的矩阵n*n，当一个i*i区域内1与0的数量相等时，这个区域称为完美区域。
// 回答 1<=i<=n 内，对应不同的i有多少个完美区域。

const size = arr.length;

for(let i = 1; i<= size;i++) {
  let count = 0;
  for(let j = 0; j<= size - i; j++) {
    for(let k = 0; k<= size - i; k++) {
      let one = 0;
      let zero = 0;
      for(let m = j; m < j+i; m++) {
        for(let n = k; n < k+i; n++) {
          if(arr[m][n] === '1') {
            one++;
          } else {
            zero++;
          }
        }
      }
      if(one === zero) {
        count++;
      }
    }
  }
  console.log(count);
}

// 上面的代码是一个暴力解法，时间复杂度是O(n^4)，当n=1000时，时间复杂度是10^12，这是不可接受的。

// 优化思路：...动态规划

// 优化后的代码如下：
const dp = new Array(size+1).fill(0).map(() => new Array(size+1).fill(0));
for(let i = 1; i<= size;i++) {
  let count = 0;
  for(let j = 0; j<= size - i; j++) {
    for(let k = 0; k<= size - i; k++) {
      // 这个 dp 的含义是：dp[i][j] 表示从 i,j 开始，边长为 i 的正方形区域内1的数量减去0的数量。
      if(i === 1) {
        dp[j][k] = arr[j][k] === '1' ? 1 : -1;
      } else {
        dp[j][k] = dp[j][k] + dp[j+1][k] + dp[j][k+1] - dp[j+1][k+1];
      }
      if(dp[j][k] === 0) {
        count++;
      }
    }
  }
  console.log(count);
}


// 这个代码的时间复杂度是O(n^2)，当n=1000时，时间复杂度是10^6
