# 数字马力

一面:
35min

- 实习过? 做的什么? 有什么亮点? 那，小程序和浏览器，vue 和 react 的区别?  
- 对 css 的了解? 布局? flex 和 grid 区别? 动画?  
- 组件的理解使用?  

- 数组上的方法? 说说 reduce 和 filter? pop push shift unshift 具体行为?  
- js 的原型链?
- 事件循环?  看代码说输出. 微任务有哪些?  
- vue 的 nextTick?

- 框架，react 父组件调用子组件方法? （阿巴阿巴）  那 vue 呢? (查了查发现类组件的和vue选项式其实很像🤣)
- react 生命周期? （阿巴阿巴）那 vue 的呢?  
- 说说你对 react 的理解?  
- vue 选项里的 data 是个函数，为什么?

- 介绍一下 http? http 各个版本的区别? websocket?

- 做个题。

```js
var rob = function(nums) {
  // 终止条件
  if(nums.length === 0) return 0
  if(nums.length === 1) return nums[0]
  if(nums.length === 2) return Math.max(nums[0], nums[1])

  // 动态规划，dp[i]表示前i个房子能偷到的最大金额
  let dp = []
  dp[0] = nums[0]
  dp[1] = Math.max(nums[0], nums[1])

  for(let i = 2; i < nums.length; i++){
    // 偷第i个房子，那么前i-1个房子不能偷，所以dp[i] = dp[i-2]+nums[i]
    dp[i] = Math.max(dp[i-1], dp[i-2]+nums[i])
  }
  return dp[nums.length-1]
};

```
