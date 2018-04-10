<p align="center">
    <a href="">
        <img alt="Logo" src="./icon/logo@128.png" />
    </a>
</p>

<h1 align="center"> LegoFlow 2 </h1>

<p align="center">
    <a href="https://opensource.org/licenses/MIT">
        <img alt="Licence" src="https://img.shields.io/badge/license-MIT-green.svg" />
    </a>
    <a href="">
        <img alt="Version" src="https://img.shields.io/badge/version-2.0-blue.svg" />
    </a>
    <a href="https://legoflow.com/" target="_blank">
        <img alt="Home" src="https://img.shields.io/badge/home-legoflow.com-orange.svg" />
    </a>
    <a href="https://legoflow.com/wiki" target="_blank">
        <img alt="Wiki" src="https://img.shields.io/badge/wiki-2.0-red.svg" />
    </a>
    <a href="" target="_blank">
        <img alt="Download-macOS" src="https://img.shields.io/badge/download-macOS-brightgreen.svg" />
    </a>
    <a href="" target="_blank">
        <img alt="Download-Windows64" src="https://img.shields.io/badge/download-Windows64-brightgreen.svg" />
    </a>
</p>

<p align="center">
    更轻、更强、开箱即用的 <strong>前端工作流客户端</strong>
</p>

## 功能

* Webpack 4x 的 JS 模块编译，支持各类模块规范
* Babel 7 ES.NEXT JS 编译
* Vue.js 2.x 开发环境
* Sass 编译
* Autoprefixer 自动补全
* 移动端 REM 适配方案
* 生成图片信息，智能图片压缩
* Base64 图片，雪碧图
* EJS 模板编译
* 自动内联样式脚本
* 自动替换线上资源地址
* JS 编译 Sass 文件 Autoprefixer 自动补全
* JS 编译 [art-template](https://aui.github.io/art-template/zh-cn/index.html) 语法 tpl 文件
* 提供工作流前后拦截器，自定义功能
* ......

## 开发

应用是通过 [Electron](https://github.com/electron/electron) 作为核心框架，构建出跨平台应用。在开发启动应用之前，请先拉取仓库，以及安装开发环境依赖。

```sh
# node version >= 5x
node -v

# 全局安装 electron
npm i electron -g

# 进入拉取的仓库文件夹
cd ./legoflow

# 安装依赖 node_modules
npm install
```

通过执行该命令以开发方式启动应用。

```sh
npm start
```

通过执行该命令打包应用，若打包过程中出现错误，请参考 [electron-packager](https://github.com/electron-userland/electron-packager) 使用文档。

```sh
# 同时打包出 macOS & Windows 应用
npm run package

# 打包 macOS 应用
npm run package:mac

# 打开 Windows64 应用
npm run package:win
```

## 文档

若想了解更多使用文档，请查看 [legoflow.com](https://legoflow.com).

## 下载

→ 百度云 下载地址:&emsp;[macOS]()&emsp;|&emsp;[Windows64]()

→ 开发服务器 下载地址:&emsp;[macOS]()&emsp;|&emsp;[Windows64]()

→ Github release 下载地址:&emsp;[macOS]()&emsp;|&emsp;[Windows64]()

## 反馈

遇到问题或者有更棒的想法，欢迎大家提出 issues.

交流 Q 群 **457756220**

## 许可

[MIT](./LICENSE)
