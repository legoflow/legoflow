# 环境变量

JS 模块自动注入 环境变量，开发者可根据 环境变量 进行逻辑处理

```js
// 开发环境 判断
if(process.env === 'dev'){
    console.info('这个是开发环境');
}

// 生产环境 判断
else if(process.env === 'build'){
    console.info('这个是生产环境');
}
```
