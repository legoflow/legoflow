# 支持模板

JS 模板支持 [art-template](https://github.com/aui/artTemplate) 语法 tpl 文件，转成压缩的 html 字符串，常用于接口获取数据后动态插入 DOM 结构 或 组件开发。如:

```html
// t.tpl
<div id="test">{{ name }}</div>
```

```js
// t.js
let thtml = require('./t.tpl')({
    name: 'test',
})

console.log(thtml); // <div id="test">test</div>
```


## 使用 helper

```html
// t.tpl
<div id="test">{{ name | test }}</div>
```

```js
// t.js
let art = require('tmodjs-loader/runtime');

art.helper('test', (val) => {
    return `test helper: ${ val }`;
})

let thtml = require('./t.tpl')({
    name: 'test',
})

console.log(thtml); // <div id="test">test helper: t</div>
```
