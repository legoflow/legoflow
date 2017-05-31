# 支持 Sass

JS 模块支持引入 sass 文件，并通过 Autoprefixer 进行自动补全，常用于组件开发。如:

```css
// t.scss
@import "./t1.scss";
@import url(./_t2.scss);

#test{
    transition: all .2s ease;
}
```

```js
// t.js
import css from './t.scss';

console.log(css); // #test{transition: all .2s ease;-webkit-transition: all .2s ease}
```
