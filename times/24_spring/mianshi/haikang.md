# 海康威视

一面  20min  
（前一个面试面错了人，好像有点着急）

自我介绍
问了一个简单的 this 的代码输出
然后写题。

```js
const arr_1 = [1,2,35,6]
// 用 reduce 把 arr_1 中的每个元素都 * 2

const arr_2 = arr_1.reduce((pre,cur)=>{
    // return pre.concat([cur * 2])
    pre.push(cur*2)
    return pre
},[])

console.log(arr_2)
```

```js
Array.prototype.myMap = function(cb){
    const res = []

    const pre = this

    for(let i= 0;i<pre.length;i++){
        res[i] = cb(pre[i], i, this)
    }
    return res
}

```

写的有点让人捉急...阿巴阿巴

vue2 vue3 熟悉哪个?  
vue3 的 watch watchEffect 区别，怎么用（忘光光，还和 react 记混了）  
vue2 组件间通信  

“写一个 eventBus?  ”
“嘶...不会”
“那你说说它怎么用的?”
“也记不清了”
“...”
“好像是和发布订阅那个很像...但我真没用过几次也没背过不知道它具体咋搞的啊”
“你都知道它是发布订阅了，还用背吗? bula bula...”
“嗯? 是发布订阅的话，我应该能写出来...?”
“好，你写一个吧”

```js

class myEventBus{
    constructor(){
        this.cbs = []
    }

    on(event,cb){
        this.cbs.push({
            event:event,
            cb:cb
        })
    }

    emit(event, ...args){
        const tobe_called = this.cbs.map((item)=>item.event === event)
        tobe_called.forEach((item)=>{
            item.cb(args)
        })
    }
}

```

“还行”

---

二面
hr
10 min
常规问题...

---

面试官一天能面多少人啊...
海康威视的，面试前有个钉钉群，我加进去发现好像是就一个面试官，一天要面十六七个人...

我看牛客上好多人发帖说感觉是 kpi...
可能是真的要招人的，但是这种强度搞下来，谁还有心情管那么多...
可能聊的对头了就给过，对不上就感谢，看运气吧...

挂了~
