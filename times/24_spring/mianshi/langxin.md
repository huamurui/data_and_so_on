# 朗新

一面:
30min

- 自我介绍
- 前公司业务都有啥，你做了什么，遇到的有挑战的事 阿巴阿巴...
- 项目中怎么封装组件，遇到的坑bualabula...

- vue2 和 vue3 的区别?
- vue 的选项式 api 中，data 为什么是个函数?
- vue 的生命周期，updated 首次渲染会执行吗

- 前公司前端人数? bula bula...
- xxx 项目做了多久?  

---

二面:
35min

- 阿巴阿巴
  - “你好”
  - “你好”
  - ...沉默..“要自我介绍吗?”
  - “不用了，或者随便说说也行，你有什么特别想说的吗?”
  - “啊，没有”
  - 大概是看简历，还看了看我博客的内容...然后问了些乱七八糟的

- url 输入到页面显示的过程。
- 你对原型链的理解? 有什么实践吗?
- 你对闭包的应用?
  - 闭包和 Promise 的区别?
- Promise 的状态? 有了解它最近新加状态提案吗? 如果一个 Promise 一直 pending 会怎么样?
- 事件循环的微任务和宏任务?
- js 单线程的理解?
- 做过小程序，那小程序的渲染和逻辑是怎么分开的?小程序发布流程?小程序分包?

- 然后又是些项目相关的问题

- options 请求?
- 开发中遇到过跨域吗? 怎么解决的?
- 你对 webpack 的理解? 有用过哪些插件? 生命周期? webpack 和 vite?

- 下面我感觉是是点进了 github 和博客又在看着问... 想了想上面那堆八股可能也是...

- 用过 copilot? 你觉得怎么样?
- 为什么选择做前端，有面试过其他岗位吗?
- 英语过了四六级，那你觉得你的英语怎么样? 有实际跟外国人交流过吗?
- 如果要你做外包，天天接那些不合理需求，你会怎么办?
- 期望薪资? 工作地点? 现在在哪? 之后的打算?
- bula bula...

- 你有什么想问我的吗?

- 麻了...下次不放博客..至少不放那些奇奇怪怪的发癫的东西了...脚趾扣地...

```js

// 然后...后来想了想那个闭包和 Promise 似乎问的是回调函数和 Promise 的区别，pending 可能是问内存泄漏的问题。当时都没怎么想就说不知道了阿巴阿巴...
// 闭包和回调函数...是一个意思吗...? 
// 回调给我的感觉是交出执行权，闭包更多强调的是变量作用域一类的东西...不过这俩概念确实相关性挺大的.
// emmm 反正，如果是问回调和 Promise 的区别的话，大概是回调的写法会有回调地狱，而 Promise 是链式调用，更好维护 bulabuala。

// 闭包版发布订阅~

function PubSub() {
  const subscribers = [];
  function subscribe(event, fn) {
    subscribers.push({ event, fn })
  }
  function publish(event, data) {
    subscribers.forEach(({ event: e, fn }) => {
      if (e === event) {
        fn(data)
      }
    })
  }
  return {
    subscribe,
    publish
  }
}

const { subscribe, publish } = PubSub();
subscribe('event', data => console.log(data));
publish('event', 'data');

subscribe('kknd', data => console.log(data));
publish('kknd', 'data');

```
