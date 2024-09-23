# 海隆

1面人事
20min
  - 我...

将一个正整数分解质因数。例如:输入90,打印出90=2*3*3*5。*
```js
function primeFactor(n) {
  let res = `${n}=`;
  // 从2开始，一直除到n

  for (let i = 2; i <= n; i++) {
    // 如果能整除，就一直除
    while (n % i === 0) {
      res += `${i}*`;
      n /= i;
    }
  }
  return res.slice(0, -1);
}

```


*有一对兔子，从出生后第3个月起每个月都生一对兔子，小兔子长到第三个月后每个月又生—对兔子，假如兔子都不死，问每个月的兔子总数为多少?*
```js
function rabbit(n) {
  // abc三个变量是三月一轮
  let a = 1, b = 0, c = 0; 
  for (let i = 1; i <= n; i++) {
    c += b;
    b = a;
    a = c;
  }
  return a + b + c;
}

```


计算出k以内最大的10个能被13或17整除的自然数之和*

```js
function sum(k) {
  let res = 0;
  for (let i = k; i > 0; i--) {
    if (i % 13 === 0 || i % 17 === 0) {
      res += i;
    }
  }
  return res;
}

```