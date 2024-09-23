// 发布订阅
class Event {
  constructor() {
    this.events = {};
  }
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [callback];
    } else {
      this.events[eventName].push(callback);
    }
  }
  emit(eventName, ...args) {
    this.events[eventName] &&
      this.events[eventName].forEach((cb) => cb(...args));
  }
  off(eventName, callback) {
    if (!this.events[eventName]) return;
    this.events[eventName] = this.events[eventName].filter(
      (cb) => cb !== callback
    );
  }
  once(eventName, callback) {
    const fn = (...args) => {
      callback(...args);
      this.off(eventName, fn);
    };
    this.on(eventName, fn);
  }
}

const event = new Event();


// 实现一个简单的Promise  
class MyPromise {
  constructor(executor) {
    this.status = 'pending';
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = value => {
      if (this.status === 'pending') {
        this.status = 'fulfilled';
        this.value = value;
        this.onFulfilledCallbacks.forEach(fn => fn());
      }
    };

    const reject = reason => {
      if (this.status === 'pending') {
        this.status = 'rejected';
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    };

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };

    let promise2 = new MyPromise((resolve, reject) => {
      if (this.status === 'fulfilled') {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (err) {
            reject(err);
          }
        }, 0);
      }

      if (this.status === 'rejected') {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (err) {
            reject(err);
          }
        }, 0);
      }

      if (this.status === 'pending') {
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (err) {
              reject(err);
            }
          }, 0);
        });

        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (err) {
              reject(err);
            }
          }, 0);
        });
      }
    });

    return promise2;
  }


  catch(onRejected) {
    return this.then(null, onRejected);
  }

  static resolve(value) {
    return new MyPromise((resolve, reject) => {
      resolve(value);
    });
  }

  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  }

  static all(promises) {
    return new MyPromise((resolve, reject) => {
      let result = [];
      let count = 0;

      promises.forEach((promise, index) => {
        promise.then(value => {
          result[index] = value;
          count++;
          if (count === promises.length) {
            resolve(result);
          }
        }, reject);
      });
    });
  }
}

let p = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  }, 1000)
})


/* vnode */
const vNode = {
  tag: 'div',
  attrs: {
    id: 'app'
  },
  children: [
    {
      tag: 'p',
      children: ['hello']
    }
  ]
}

function render(vNode) {
  if (typeof vNode === 'string') {
    return document.createTextNode(vNode)
  }

  const el = document.createElement(vNode.tag)
  for (let key in vNode.attrs) {
    el.setAttribute(key, vNode.attrs[key])
  }
  if (vNode.children) {
    vNode.children.forEach(child => {
      el.appendChild(render(child))
    })
  }
  return el
}


// LRU

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

// 实现一个简单的new
function myNew(fn, ...args) {
  const obj = Object.create(fn.prototype)
  const result = fn.apply(obj, args)
  return result instanceof Object ? result : obj
}

// 实现一个简单的call
Function.prototype.myCall = function (context, ...args) {
  context = context || window
  // 改变this指向，将函数挂载到context上
  context.fn = this
  // 执行并获取函数执行结果
  const result = context.fn(...args)
  // 删除context上的函数
  delete context.fn
  return result
}

// instanceof

function myInstanceof(left, right) {
  let proto = left.__proto__
  let prototype = right.prototype
  while (true) {
    if (proto === null) return false
    if (proto === prototype) return true
    proto = proto.__proto__
  }
}

// debounce

function debounce(fn, delay) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}

// throttle
function throttle(fn, delay) {
  let flag = true
  return function (...args) {
    if (!flag) return
    flag = false
    setTimeout(() => {
      fn.apply(this, args)
      flag = true
    }, delay)
  }
}

// deep clone
const deepClone = (obj) => {
  // 结束条件是 obj 不是对象或数组这样可以嵌套的数据类型
  if (typeof obj !== "object") {
    return obj;
  }
  let result = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 如果值是对象或数组，递归调用，否则直接赋值
      result[key] = deepClone(obj[key]);
    }
  }
  // 返回结果
  return result;
};

// curry
function curry(fn, ...args) {
  return fn.length <= args.length ? fn(...args) : curry.bind(null, fn, ...args);
}

