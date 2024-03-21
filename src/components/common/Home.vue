<template>
    <!-- 整体布局容器 -->
    <div class="wrapper">
        <!-- 头部组件 -->
        <v-head></v-head>
        <!-- 侧边栏组件 -->
        <v-sidebar></v-sidebar>

        <!-- 内容区域 -->
        <div class="content">
            <!-- 切换动画效果的路由视图 -->
            <transition name="move" mode="out-in"><router-view></router-view></transition>
        </div>
    </div>
</template>

<script>
    import vHead from './Header.vue'; // 导入头部组件
    import vSidebar from './Sidebar.vue'; // 导入侧边栏组件
    export default {
        components:{
            vHead, vSidebar // 注册头部和侧边栏组件
        }
    }
</script>
