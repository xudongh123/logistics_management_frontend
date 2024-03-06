import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/home',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
                {
                    path: '',
                    component: resolve => require(['../components/Index.vue'], resolve)
                },
                {
                    path: 'driver',
                    component: resolve => require(['../components/fleet/driver/list.vue'], resolve)
                },
                {
                    path: 'driver/add',
                    component: resolve => require(['../components/fleet/driver/add.vue'], resolve)
                },
                {
                    path: 'car',
                    component: resolve => require(['../components/fleet/car/list.vue'], resolve)
                },
                {
                    path: 'car/add',
                    component: resolve => require(['../components/fleet/car/add.vue'], resolve)
                },
                {
                    path: 'order/add',
                    component: resolve => require(['../components/order/add.vue'], resolve)
                },
                {
                    path: 'order',
                    component: resolve => require(['../components/order/list.vue'], resolve)
                },
                {
                    path: 'order/taking',
                    component: resolve => require(['../components/order/taking.vue'], resolve)
                },
                {
                    path: 'profit',
                    component: resolve => require(['../components/profit/list.vue'], resolve)
                },
                {
                    path: 'profit/pay',
                    component: resolve => require(['../components/profit/pay.vue'], resolve)
                },
                {
                    path: 'user',
                    component: resolve => require(['../components/user/info.vue'], resolve)
                },
                {
                    path: 'userList',
                    component: resolve => require(['../components/user/list.vue'], resolve)
                },
                {
                    path: 'user/add',
                    component: resolve => require(['../components/user/add.vue'], resolve)
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/Login.vue'], resolve)
        },
    ]
})
