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
    <a href="https://pan.baidu.com/s/1PfUT9GwOxovp1E3Kj5WP8g" target="_blank">
        <img alt="Download" src="https://img.shields.io/badge/download-app-brightgreen.svg" />
    </a>
    <a href="https://github.com/legoflow/legoflow/blob/master/CHANGELOG.md" target="_blank">
        <img alt="ChangeLog" src="https://img.shields.io/badge/CHANGE-LOG-orange.svg" />
    </a>
    <a href="">
        <img alt="PRs Welcome" src="https://img.shields.io/badge/PRs-welcome-green.svg" />
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
* ......

## 开发

应用是通过 [Electron](https://github.com/electron/electron) 作为核心框架，构建出跨平台应用。在开发启动应用之前，请先拉取仓库，以及安装开发环境依赖。

```sh
# node version = v8.x
node -v

# 全局安装 electron v1.8.4
npm i electron@1.8.4 -g

# 进入拉取的仓库文件夹
cd ./legoflow

# 安装依赖
npm install
```

启动应用

```sh
npm start
```

打包应用，若打包过程中出现错误，请参考 [electron-packager](https://github.com/electron-userland/electron-packager) 使用文档。

```sh
# 打包 macOS 应用
npm run package:mac
```

## 使用说明

查看 **[2.0 使用说明](https://legoflow.com/wiki)**

## 更新日志

查看 **[CHANGELOG](https://github.com/legoflow/legoflow/blob/master/CHANGELOG.md)**

## 下载

→ 百度云盘 **[下载地址](https://pan.baidu.com/s/1PfUT9GwOxovp1E3Kj5WP8g)**

→ 腾讯云盘 **[下载地址](https://share.weiyun.com/5kP4ElS)**

若出现以上源都无法下载，请加 Q 群下载群共享文件

## v1.0 版本

[https://legoflow.com/v1](https://legoflow.com/v1)

## 反馈

遇到问题或者有更棒的想法，欢迎大家提出 issues 或 PR.

交流 Q 群 **457756220**

## 许可

[MIT](./LICENSE)

