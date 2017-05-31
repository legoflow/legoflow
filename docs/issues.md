# 常见问题 Q&A

##### Q: 项目中怎样使用 其他 node_modules

A: 例如需要在项目中使用 xxx 模块。先在项目中直接进行 `$ npm i xxx --save`，然后通过配置 legoflow.json 中 alias 参数 `"alias": { "modules": "./node_modules" }`，在 JS 中即可通过 `require('modules/xxx')` 引入或使用其他模块。

