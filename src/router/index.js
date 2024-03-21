import Vue from 'vue'; // 导入Vue框架
import Router from 'vue-router'; // 导入Vue Router

Vue.use(Router); // 使用Vue Router插件

export default new Router({
    routes: [
        {
            path: '/', // 根路由重定向到登录页
            redirect: '/login'
        },
        {
            path: '/home', // Home组件路由配置
            component: resolve => require(['../components/common/Home.vue'], resolve), // 异步加载Home组件
            children:[
                {
                    path: '', // 默认子路由指向Index组件
                    component: resolve => require(['../components/Index.vue'], resolve)
                },
                {
                    path: 'driver', // 司机管理路由
                    component: resolve => require(['../components/fleet/driver/list.vue'], resolve)
                },
                {
                    path: 'driver/add', // 新增司机路由
                    component: resolve => require(['../components/fleet/driver/add.vue'], resolve)
                },
                {
                    path: 'car', // 车辆管理路由
                    component: resolve => require(['../components/fleet/car/list.vue'], resolve)
                },
                {
                    path: 'car/add', // 新增车辆路由
                    component: resolve => require(['../components/fleet/car/add.vue'], resolve)
                },
                {
                    path: 'order/add', // 新增订单路由
                    component: resolve => require(['../components/order/add.vue'], resolve)
                },
                {
                    path: 'order', // 订单列表路由
                    component: resolve => require(['../components/order/list.vue'], resolve)
                },
                {
                    path: 'order/taking', // 进行中订单路由
                    component: resolve => require(['../components/order/taking.vue'], resolve)
                },
                {
                    path: 'profit', // 收益统计路由
                    component: resolve => require(['../components/profit/list.vue'], resolve)
                },
                {
                    path: 'profit/pay', // 支付收益路由
                    component: resolve => require(['../components/profit/pay.vue'], resolve)
                },
                {
                    path: 'user', // 用户信息路由
                    component: resolve => require(['../components/user/info.vue'], resolve)
                },
                {
                    path: 'userList', // 用户列表路由
                    component: resolve => require(['../components/user/list.vue'], resolve)
                },
                {
                    path: 'user/add', // 新增用户路由
                    component: resolve => require(['../components/user/add.vue'], resolve)
                }
            ]
        },
        {
            path: '/login', // 登录页路由
            component: resolve => require(['../components/Login.vue'], resolve)
        },
    ]
})
