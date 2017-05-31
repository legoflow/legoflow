# legoflow.json

新建项目后，项目目录下会生成 `legoflow.json` 文件用于配置 各种工作流功能

其中各个参数含义为


##### → version 

标识创建项目的 legoflow 版本


##### → type

标识创建项目的脚手架类型


##### → assets

设置静态资源地址，构建时会自动将 HTML, CSS, JS 内的路径指向到该地址

##### → es6

是否开启 ES6 编译

##### → webp

是否开启 webp 策略

##### → legolib

是否使用 Lego-lib

##### → https

是否开启 HTTPS 调试模式

##### → hot

是否开发热更新模式

##### → isUglifyJs

构建阶段是否压缩JS代码

##### → isPackVueStyle

构建阶段是否打包出 vue 内联样式

##### → vue@2.1

是否使用 vue 2.1.x 版本 loader

##### → watch

设置开发阶段额外监听文件夹

例子: `"watch": ["./src/assets"]`

##### → publicPath

设置构建阶段 webpack publicPath，常用于代码分割后资源指向

例子: `"publicPath": "https://legox.org/assets"`

##### → packImgSize

设置构建阶段 webpack 内联图片 base64 阈值

##### → packCommon

设置构建阶段 webpack 打包出 公共 模块

##### → other

设置其他的配置文件

##### → dist

设置构建完成的文件夹名称

##### → output

设置构建完成输出的目录地址 ( 注意需要是绝对地址 )

##### → shell

设置构建阶段 自定义的 SH 或 JS 操作的文件的地址

##### → alias

设置 webpack 参数 alias

##### → global

设置 webpack 参数 global

##### → externals

设置 webpack 参数 externals

##### → proxy

设置开发模式下 代理

例子:

```js
"proxy": {
    "/": "/index.html",
    "/a/**": "/index.html",
},
```

##### → ts

设置 TypeScript 参数

##### → cache

设置 HTML 资源路径是否叫上 版本号 或 时间戳

例子:

```js
"cache": "version"
```

```html
<!-- 构建出的 HTML 资源路径 -->
<script src="./vue.min.js?v=0.1.2"></script>
```

##### → user.dev.args

设置开发阶段，根据用户名注入参数值

例子:
```js
"user.dev.args": {
    "*": {
        "token1": "'123'",
    },
    "lijialiang": {
        "token2": "'321'",
    }
}
```

```js
// 用户名为 lijialiang, 在 js 访问变量
console.log( process.args.token1 ) // 123
console.log( process.args.token2 ) // 321
```

##### → user.build.args

设置构建阶段，根据用户名注入参数值，使用方式可参考 `user.dev.args`

##### → build.env

设置多种构建环境

例子: 

分别设置 测试环境 以及 线上环境 不相同的 publicPath 参数

```js
"build.env": {
    "test": {
        "publicPath": "https://a.com"
    },
    "publish": {
        "publicPath": "https://b.com"
    },
}
```

##### → env

设置构建环境标识

例子: 

连同 `build.env` 参数使用，指定构建出 测试环境 的代码 `"env": "test"`


##### → build.zip

设置构建完成打包出 zip 包

例子:

`"build.zip":"x"` 构建完成后打包出 名为 x 的 zip 包






