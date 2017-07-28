'use strict';

module.exports = ( parameter ) => {

    const path = require('path');

    // fs 从 legolfow 注入的模块，使用方法 https://github.com/jprichardson/node-fs-extra
    // del 从 legolfow 注入的模块，使用方法 https://github.com/sindresorhus/del/blob/1fd6f0f72e26987a2825fea040b7d7a17158047c/readme.md
    // shell 从 legolfow 注入的模块，使用方法 https://github.com/shelljs/shelljs
    // args 为 legoflow.json 环境配置参数 ( 客户端版本 v1.0.17+ )
    // folder 项目路径 ( 请 shell 下所有操作基于 项目路径 )
    // messager 用于回调信息给 客户端，在面板上展示
    const { fs, del, shell, folder, messager, args } = parameter;

    // 获取 dist 文件夹路径
    const dist = path.resolve(folder, './dist');

    // 通过 message 输出信息到 legoflow 通知面板
    messager.log(dist);
    
    // 可通过配置了构建环境参数去执行不一样的 shell 操作
    if ( args && args.test ) {
        messager.log('测试构建环境');
        messager.success();
        return 0;
    }

    shell.cd(folder);

    // 建议先在命令行上执行 node gulp.js 确保脚本可运行
    if ( shell.exec('node gulp.js').code === 0 ) {
        // 构建完成后，告诉客户端脚本成功结果，释放 工作流线程资源
        messager.success();
    } else {
        // 构建完成后，告诉客户端脚本失败结果，释放 工作流线程资源
        messager.error('shell error');
    }
    
}
