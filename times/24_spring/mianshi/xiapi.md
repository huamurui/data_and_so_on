# 虾皮

一面:
50min

- 介绍
- 实习过吗? 有什么亮点?
- 做过小程序? 小程序和浏览器的web页面，有什么区别?
- 闭包? 应用场景? 有什么缺点?
- 箭头函数?
- 声明变量 var let const 区别?
- 跨域?
- 状态码?
- 水平垂直居中的方法?
- BFC?
- 浏览器储存? 应用? cookie, localStorage 区别? sessionStorage?
- 像 react 这样的项目里，做过哪些性能优化?
- 设计实现一个图片懒加载?

写个 flat，将多维数组扁平化

```js
function flat(arr) {
  return arr.reduce((acc, cur) => {
    return acc.concat(Array.isArray(cur) ? flat(cur) : cur)
  }, [])
}
```

写个 LRU 缓存

```js
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity
    this.cache = new Map()
  }

  get(key) {
    if (!this.cache.has(key)) return -1
    const value = this.cache.get(key)
    this.cache.delete(key)
    this.cache.set(key, value)
    return value
  }

  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key)
    } else if (this.cache.size >= this.capacity) {
      this.cache.delete(this.cache.keys().next().value)
    }
    this.cache.set(key, value)
  }
}
```
