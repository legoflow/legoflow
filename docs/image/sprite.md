# 雪碧图

项目目录 `/src/img/slice` 下放置的图片，在构建工作流中，合成雪碧图，并在样式文件中增加对应的 `background-position` 等信息

**若样式文件中没有引入该路径下的图片，不会进行合并雪碧图**

## 合成多张雪碧图

以 `/src/img/slice` 路径下的目录为单位，生成多张雪碧图。如:

```
图片
/src/img/slice/a.png
/src/img/slice/b.png
/src/img/slice/page-1/c.png
/src/img/slice/page-1/d.png
/src/img/slice/page-2/e.png
/src/img/slice/page-2/f.png

合成后

/dist/img/sprite.png
/dist/img/page-1.png
/dist/img/page-2.png
```

## 关于 Mobile（项目类型）

生成的样式长度单位为 rem, 其中包括的样式属性为

* background-position
* background-size
