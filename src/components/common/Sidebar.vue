<template>
    <!-- 侧边栏容器 -->
    <div class="sidebar">
        <!-- Element UI 的垂直菜单 -->
        <el-menu class="el-menu-vertical-demo" unique-opened router>
            <!-- 循环渲染菜单项 -->
            <template v-for="item in items">
                <template v-if="item.subs">
                    <!-- 子菜单 -->
                    <el-submenu :index="item.index">
                        <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
                        <!-- 子菜单项 -->
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index">{{ subItem.title }}</el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <!-- 单个菜单项 -->
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
            // 初始化菜单数据
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
                            title: '创建货单'
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
            items.push(userManage); // 将账户管理模块添加到菜单中
            return {
                items
            }
        },
        computed:{
        }
    }
</script>

<style scoped>
    /* 样式 */
    .sidebar{
        display: block;
        position: absolute;
        width: 220px;
        left: 0;
        top: 70px;
        bottom: 0;
        background: #2E363F; /* 设置背景颜色 */
    }
    .sidebar > ul {
        height:100%;
    }
</style>
