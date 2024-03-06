<template>
    <div class="sidebar">
        <el-menu class="el-menu-vertical-demo" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index">
                        <i :class="item.icon"></i>{{ item.title }}
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            let userManage = {
                                icon: 'el-icon-menu',
                                title: '账户管理',
                                index: '4',
                                subs: [
                                    {
                                        icon: 'el-icon-star-on',
                                        index: '/home/user',
                                        title: '个人中心'
                                    }
                                ]
                            }
            if (localStorage.getItem('permissionLevel') == 0) {
                userManage.subs.push({
                                    index: '/home/userList',
                                    title: '账户列表'
                                });
            }
            let items = [
                    {
                        icon: 'el-icon-menu',
                        index: '/home',
                        title: '首页'
                    },
                    {
                        icon: 'el-icon-date',
                        index: '2',
                        title: '车队管理',
                        subs: [
                            {
                                index: '/home/driver',
                                title: '司机管理'
                            },
                            {
                                index: '/home/car',
                                title: '车辆管理'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-date',
                        index: '3',
                        title: '货单管理',
                        subs: [
                            {
                            icon: 'el-icon-star-off',
                            index: '/home/order/add',
                            title: '创建货单',
                            },
                            {
                                icon: 'el-icon-star-on',
                                index: '/home/order',
                                title: '我的货单',
                            },
                        ]
                    },
                    {
                        icon: 'el-icon-share',
                        index: '/home/profit',
                        title: '费用跟踪'
                    }
                ]
            items.push(userManage);
            return {
                items
            }
        },
        computed:{
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 220px;
        left: 0;
        top: 70px;
        bottom:0;
        background: #2E363F;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
