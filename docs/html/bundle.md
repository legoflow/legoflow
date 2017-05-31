# 合并资源

通过 HTML 固定的注释语法，把资源打包合并，减少请求数，减少 TTFB，优化加载性能

## 例子

```html
<!-- @bundle ./js/base.min.js -->
<script src="./assets/axios.min.js"></script>
<script src="./assets/vue.min.js"></script>
<script src="./assets/vuex.min.js"></script>
<script src="./assets/vue-router.min.js"></script>
<!-- @endbundle -->
```
