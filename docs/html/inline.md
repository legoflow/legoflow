# 样式脚本内联

通过 html 内联样式或脚本文件，减少请求数，减少 TTFB，优化加载性能

## 例子

在 html 外链上加上 inline 属性即可。如:

```html
<link href="css/index.css" rel="stylesheet" inline>

<script src="js/index.js" charset="utf-8" inline></script>
```

构建工作流判断该属性自动注入相应样式或脚本的构建文件
