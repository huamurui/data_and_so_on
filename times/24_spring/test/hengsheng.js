// console.log('Path:', __filename);
// // 在金融分析中，移动平均线（Moving Average，MA）是一种常用的工具，用于分析股票或期货的价格趋势。移动平均线可以平滑价格的波动，帮助分析者识别价格的长期趋势。示例：
// // calculateMovingAverage(["1.5", "2.0", "2.5", "3.0", "3.5"], 3); // 返回 ["2", 2.5, "3"]
// // 提示：
// // 你可以使用一个滑动窗口的算法来高效地计算移动平均线，避免对每个窗口内的价格进行重复求和。

function calculateMovingAverage( prices ,  windowSize ) {
  // write code here
  if (prices.length < windowSize) {
    return [];
  }
  let res = [];
  let sum = 0;
  for (let i = 0; i < windowSize; i++) {
    sum += Number(prices[i]);
  }
  res.push((sum / windowSize).toFixed(1));
  for (let i = windowSize; i < prices.length; i++) {
    sum += Number(prices[i]) - Number(prices[i - windowSize]);
    res.push((sum / windowSize).toFixed(1));
  }
  return res;
}

console.log(calculateMovingAverage(["1.5", "2.0", "2.5", "3.0", "3.5"], 3));

// const gupiao = [5,1,3,5,6]
// // gupiao 是一个数组，表示某股票在连续 n 天的价格。你可以选择在某一天买入该股票，并选择在未来的某一个不同的日期卖出该股票。请计算出获得的最大利润。如果不能获得任何利润，返回 0。
// // 可以多次交易，但是必须在再次购买前出售掉之前的股票
// function maxProfit( prices ) {
//   // write code here
//   let res = 0;
//   for (let i = 1; i < prices.length; i++) {
//     if (prices[i] > prices[i - 1]) {
//       res += prices[i] - prices[i - 1];
//     }
//   }
//   return res;
// }
// console.log(maxProfit(gupiao));