# 类型检查

JavaScript 是一种弱类型（或称动态类型）语言，即变量的类型是不确定的

但在长期维护开发中，强类型 对项目的健壮性显得有关重要，因而我们需要为 JavaScript 加入 类型检查 解决方案

## flow-runtime

[了解语法](https://flow.org/en/docs/getting-started/)

#### 简单例子

```js
// main.js
function y ( x: string ) {
    console.log(x);
}

y(123); // error
```


## TypeScript

[了解语法](https://www.typescriptlang.org/docs/tutorial.html)

#### 简单例子

```js
// main.js
require('test.ts');

// test.ts
function y ( x: string ) {
    console.log(x);
}

y(123); // error
```
