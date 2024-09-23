# JQuery

jQuery 是一个快速、小巧且功能丰富的 JavaScript 库。它使 诸如 HTML 文档遍历和操作、事件处理、 动画，而 Ajax 则更简单，具有易于使用的 API 可以跨 多种浏览器。结合了多功能性和 可扩展性，jQuery改变了数百万人写 JavaScript 的方式。

- <https://www.jianshu.com/p/194e4cc4cd99>

核心:

- 选取，操作。

其他:

- 过滤，查找结果集，事件处理，动画，Ajax。

虽然随着浏览器发展，很多 jQuery 的功能已经被各种新生的 API 所替代，但是 jQuery 仍然是一个非常流行的库，在许多老项目或者非常规浏览器环境比如爬虫、SSR(jsp,asp...) 等场景中，jQuery 仍然是一个很好的选择。

```js
- $() => document.querySelector()
- $.ajax() => fetch() / axios
- $.onxxx() => addEventListener('xxx',fn)
- $.animate() => CSS3 Animation
```

因为 jQuery 的 API 设计得太人性化了！

举几个例子给大家看看：

第一个是 jQuery 对事件监听的简化

```js
// 那时，如果不用 jQuery，监听事件（兼容 IE 6）你要这么写
if (button.addEventListener)
  button.addEventListener('click',fn);
else if (button.attachEvent) {
  button.attachEvent('onclick', fn);
}else {
  button.onclick = fn;
}

// 但是如果你用 jQuery，你只需要这么写
$(button).on('click', fn)
```

第二个是 jQuery 对元素选择的简化

```js
// 如果你想获取 .nav > .navItem 对应的所有元素
// 在 IE 6 上，你得这么写
var navItems = document.getElementsByClassName('navItem')
var result = []
for(var i = 0; i < navItems.length; i++){
  if(navItems[i].parentNode.className.match(/nav/)){
    result.push(navItems[i])
  }
}
//用 jQuery 是这样写的
$('.nav > .navItem')
```

有没有发现 jQuery 的代码一读就读懂了？可读性非常强！

当时我作为一个新人，每每看到 jQuery 那优雅的 API，都禁不住去思考 jQuery 到底是怎么实现的，我自己能不能实现出来（但我并不推荐看 jQuery 源码）。本着这样的想法，我学会了很多编程技巧。

为什么有些人代码水平老是提不高了，就是因为不会造轮子，不会设计优雅的 API，更不会实现优雅的 API，只会调用其他库或框架提供的功能（中枪的举手）。

而 jQuery 则提供了一个简单而又经典的范例供大家学习。

不信的话我们就来看看 jQuery 用到了哪些所谓的设计模式（其实就是编程套路）吧。

一、发布订阅模式

```js
var eventHub = $({})

eventHub.on('xxx', function(){ console.log('收到') })

eventHub.trigger('xxx')
```

二、用原型继承实现插件系统

```js
$.fn.modal = function(){ ... }

$('#div1').modal()

Vue 2 的插件也是类似的思路哦
```

三、事件委托

```js
$('div').on('click', 'span', function(){...})
```

四、链式调用

```js
$('div').text('hi').addClass('red').animate({left: 100})
```

五、函数重载（伪）

```js
$(fn)
$('div')
$(div)
$($(div))
$('span', '#scope1')
```

你会发现 $ 这个函数的参数可以是函数、字符串、元素和 jQuery 对象，甚至还能接受多个参数，这种重载是怎么做到的？

六、命名空间

```js
// 你的插件在一个 button 上绑定了很多事件
$button.on('click.plugin', function(){...})
$button.on('mouseenter.plugin', function(){...})

// 然后你想在某个时刻移除以上所有事件
$button.off('.plugin')

```

如果你不用 jQuery 就很麻烦了。


七、无需 new

```js
let $div = $('<div>hi</div>')
```

其他就不一一列举了。

jQuery 的 API 风格依然在流行

我们把 jQuery 和 Axios 做一下对比

```js
$.ajax({url:'/api', method:'get'})
$.get('/api').then(fn1,fn2)
axios({ url: '/api', method: 'get'})
axios.get('/api').then(fn1, fn2)
```

为什么 2018 年流行的 axios 跟 jQuery.ajax 这么相像呢？

因为 jQuery 的 API 实在太好用了！搞得新库根本没法超越它，没有办法设计出更简洁的 API 了。毕竟 jQuery 也是在前端界流行近十年。

所以你学了 jQuery 很容易过渡其他类似的新库。

jQuery 也能做 MVC

很多人以为前端框架是从 Vue、React 和 Angular 才开始的，其实 jQuery 时代早就有基于 jQuery 的 MV* 库了，比如著名的 Backbone.js 和 Marionette.js。

看看下面的 Backbone 应用代码

```js

var TodoView = Backbone.View.extend({
  tagName: 'div',
  template: _.template($('#item-template').html()),
  events: {
    'click .toggle': 'xxx',
  },
  initialize: function () {
    this.listenTo(this.model, 'change', this.render);
  },
  render: function () {
  if (this.model.changed.id !== undefined) {return; }
  this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});

```

最后就引用我之前的一个回答作为结尾来说明学习 jQuery 意义：

完全理解jQuery源代码，在前端行业算什么水平？​

1 精通正则表达式
2 了解闭包
3 了解原型链
4 精通 DOM API
5 了解各种设计模式（事件、Promise、伪重载、装饰器模式等）
6 精通 DOM 事件
7 了解旧浏览器的各种特性（bug）
8 了解模块化
9 了解浏览器渲染原理
10 精通 AJAX
11 了解 HTTP 请求

AngularJS、Vue 1.x、Vue 2.x 其实都是顺着 Backbone MVC 的思路慢慢优化、改造得来的，如果你了解 Backbone 作为知识铺垫，那么理解 Vue 是非常容易的。如果面试官问你 MVC 和 MVVM 的区别，你也是很容易就可以答出来的。

- Backbone
  1. JQuery/Zepto (DOM操作 | 事件处理 | Ajax)
  2. Handlebars/Mustache (模板引擎 | 数据驱动视图)
  3. Underscore/Lodash (工具库 | 函数式编程 | 增强JS原生对象)
  4. RequireJS/SeaJS (模块化 | JS工程化)

-1. 2. 的工作被 Vue/React 这样的视图框架取代  
-3. 4. 的工作被 ES6 取代
...

- Ember

## MVC 与 MVVM

现代软件基本都有以下几个部分：

- 界面
- 数据
- 事件
- 业务

而其中一个重要部分是，数据与界面的更新与同步。

两者的 M V 都是指的 Model 和 View，区别在于连接两者 Controller 和 ViewModel。
Controller 中的逻辑通常需要自己手动去编写维护，而 ViewModel 则一般是库或框架自动维护。
而这种自动维护

其中 Controller  

## Vue

1. Vue 干了什么?

核心:

- 声明式渲染
  - 模板语法
- 响应性  
  - 响应式数据
  - computed、watch... 钩子

其他:

- 工程化
  - 组件化、单文件组件
  - 工具链

看一个简单的情形，用户打开一个页面查看数据，然后点击刷新或者修改数据，这个时候我们需要重新获取数据，然后更新页面。这个过程中，我们需要做的事情有：

- 事件处理
- 获取数据
- 更新数据
- 更新页面

2. Web 可以做什么 & 状态机

```js
export const fabMachine = createMachine({
  id: 'fab',
  initial: 'default',
  states: {
    default: {
      on: {
      }
    },
    active: {
      on: {
      }
    },
    dragging: {
      on: {
      }
    },
    sticky: {
      on: {
      }
    },
    pre_sticky: {
      on: {
      }
    },
  }
});

```

我之前有了解过状态机相关的一些概念，它在UI UX，交互方面有挺多的应用，你能将这部分内容，与某些设计模式相关联的来理解一下吗？



