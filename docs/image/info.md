## 图片信息

放置在 项目目录 `/src/img/` 下的图片，开发/构建工作流都会获取其信息，包括宽度/高度以及 `background-image` 路径生成 sass 样式，保存在 项目目录 `/src/sass/_img.scss` 文件。 如:

```html
图片
/src/img/avatar.png
/src/img/slice/loading.png
```

```css
/src/sass/_img.scss

%avatar.png{
    width: 80px;
    height: 80px;
    background-image: url('../img/avatar.png');
    background-size: contain;
    background-repeat: no-repeat;
}

%slice-loading.png{
    width: 80px;
    height: 32px;
    background-image: url('../img/slice/loading.png');
    background-size: contain;
    background-repeat: no-repeat;
}
```

默认脚手架 基础 sass 文件已引入 _img.scss，直接使用即可:

```css
#test-1{
    @extend %avatar.png
}

#test-2{
    @extend %slice-loading.png
}
```


## 关于 Mobile（项目类型）

生成的图片信息长度单位为 rem. 如:

```html
图片
/src/img/avatar.png
/src/img/slice/loading.png
```

```css
/src/sass/_img.scss

%avatar.png{
    width: 0.8rem;
    height: 0.8rem;
    background-image: url('../img/avatar.png');
    background-size: contain;
    background-repeat: no-repeat;
}

%slice-loading.png{
    width: 0.8rem;
    height: 0.32rem;
    background-image: url('../img/slice/loading.png');
    background-size: contain;
    background-repeat: no-repeat;
}
```

** 注意 ** 雪碧图文件夹的图片信息，其中 ```background-size: contain;``` 样式，只有在 开发工作流 上才会产生。


# 优化

本来 片段名上带有路径还有后缀是为了保持资源引用的唯一性，但对于开发者需要引用该片段名的时候，就显得很臃肿，因此对 片段名 进行优化，如：

```html
图片
/src/img/base64/avatar.png
```
↓ 编译成

```sass
/src/sass/_img.scss

%avatar {
    width: 80px;
    height: 80px;
    background-image: url('../img/base64/avatar.png');
    background-size: contain;
    background-repeat: no-repeat;
}
%base64-avatar.png {
    width: 80px;
    height: 80px;
    background-image: url('../img/base64/avatar.png');
    background-size: contain;
    background-repeat: no-repeat;
}
```

也就是在原有的基础上，增加了一个只有文件名的 片段，开发者引用起来相对简单很多，但值得注意的是，如果重名的资源片段，会覆盖前一个，这时若想引入最为正确的片段，可以使用 **全路径 + 文件名的片段**
