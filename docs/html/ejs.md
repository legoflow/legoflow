# EJS编译

通过 EJS 动态语言，实现编译 HTML 文件迭代结构等

## 例子

文件项目结构 `/src/ejs/x.ejs` 自动编译到 `/src/x.html`

## 注意

默认项目类型并不自动创建 **/src/ejs** 文件夹


## 新增注入 环境变量

开发者可根据 环境变量 进行逻辑处理

例子

```html
<!-- @if env='dev' -->
<!-- 移动端开发调试 log 组件 -->
<script src="http://assets.dwstatic.com/base/log/log.js" charset="utf-8"></script>
<h1>开发环境</h1>
<!-- @endif -->

<!-- @if env='build' -->
<h1>生产环境</h1>
<!-- @endif -->
```

→ 开发环境 编译出的 HTML

```html
<script src="http://assets.dwstatic.com/base/log/log.js" charset="utf-8"></script>
<h1>开发环境</h1>
```

→ 生产环境 编译出的 HTML

```html
<h1>生产环境</h1>
```
