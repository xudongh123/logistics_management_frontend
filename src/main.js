import Vue from 'vue'; // 导入Vue框架
import App from './App'; // 导入根组件App
import router from './router'; // 导入路由配置
import axios from 'axios'; // 导入axios用于发起HTTP请求
import ElementUI from 'element-ui'; // 导入ElementUI组件库
import 'element-ui/lib/theme-default/index.css'; // 引入ElementUI默认主题样式
import "babel-polyfill"; // 导入babel-polyfill，用于兼容不同浏览器

import VueAMap from 'vue-amap'; // 导入vue-amap地图组件

Vue.use(ElementUI); // 使用ElementUI插件
Vue.prototype.$axios = axios; // 将axios挂载到Vue原型链上
Vue.use(VueAMap); // 使用vue-amap组件
VueAMap.initAMapApiLoader({
  key: '34644bffcbfb87c1be2935cd0e5d2b31', // 初始化高德地图API的key
  plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType'] // 配置所需的高德地图插件
});

// 路由钩子
router.beforeEach((to, from, next) => {
  // 记录上一个地址
  localStorage.setItem('url_from',from.path);
  next(); // 执行路由跳转
});

new Vue({
  router,
  render: h => h(App) // 渲染根组件App
}).$mount('#app'); // 挂载根组件到id为app的DOM元素上
