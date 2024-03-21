<template>
    <!-- 头部导航栏组件 -->
    <div class="header">
        <!-- 左侧logo和系统标题 -->
        <div class="logo"><img src="/static/img/logo.png" style="width: 45px; margin: 10px 15px; vertical-align: middle;">物流管理系统</div>
        <!-- 右侧用户信息和下拉菜单 -->
        <div class="user-info">
            <el-dropdown trigger="click" @command="handleCommand">
                <!-- 用户昵称和头像 -->
                <span class="el-dropdown-link">
                    <img class="user-logo" src="/static/img/user.png">
                    {{nickname}}
                </span>
                <!-- 下拉菜单选项 -->
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="loginout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
    import { getInfo } from '@/api/user'
    export default {
        data() {
            return {
                // 初始化数据
                name: '未命名',
                nickname: localStorage.getItem('username'), // 获取本地存储的用户名作为昵称
                loadingParam: {
                    token: localStorage.getItem('token') // 获取本地存储的token
                }
            }
        },
        created(){
            // 在组件创建时获取用户信息
            getInfo(this.loadingParam).then(response => {
                if(response.data.nickname){
                    this.nickname = response.data.nickname; // 如果返回数据中包含昵称，则更新昵称
                }
            });
        },
        methods:{
            // 处理下拉菜单点击事件
            handleCommand(command) {
                if(command == 'loginout'){
                    // 退出登录操作，清除本地存储的用户信息并跳转到登录页
                    localStorage.removeItem('username')
                    localStorage.removeItem('token')
                    localStorage.removeItem('type')
                    this.$router.push('/login');
                }
            }
        }
    }
</script>

<style scoped>
    /* 样式 */
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        line-height: 70px;
        color: #fff;
        background: #6fa3d7;  /* 创建渐变背景 */
    }
    .header .logo{
        float: left;
        width:220px;
        margin-left: 30px;
        text-align: center;
    }
    .user-info {
        float: right;
        padding-right: 50px;
        font-size: 16px;
        color: #fff;
    }
    .user-info .el-dropdown-link{
        position: relative;
        display: inline-block;
        padding-left: 50px;
        color: #fff;
        cursor: pointer;
        vertical-align: middle;
    }
    .user-info .user-logo{
        position: absolute;
        left:0;
        top:15px;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
</style>
