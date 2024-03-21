<template>
    <!-- 面包屑导航 -->
    <el-row>
        <el-row>
            <el-breadcrumb separator="/">
                <!-- 面包屑项，链接到首页 -->
                <el-breadcrumb-item :to="{ path: '../home' }">首页</el-breadcrumb-item>
                <!-- 当前页面的面包屑项 -->
                <el-breadcrumb-item>账户列表</el-breadcrumb-item>
            </el-breadcrumb>
        </el-row>

        <!-- 添加账户按钮 -->
        <el-row style="margin-top: 10px">
            <el-button style="float: right;" type="primary" @click="createData()">添加账户</el-button>
        </el-row>

        <!-- 账户列表表格 -->
        <el-row style="margin-top: 10px">
            <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit
                      highlight-current-row style="width: 100%">
                <el-table-column prop="username" label="账户名"/>
                <el-table-column prop="nickname" label="昵称"/>
                <el-table-column prop="sex" label="性别"/>
                <el-table-column prop="permissionLevel" label="权限等级">
                </el-table-column>
                <el-table-column
                    label="">
                </el-table-column>
                <el-table-column label="备注"/>
                <el-table-column label="操作" width="180">
                    <!-- 操作列模板 -->
                    <template scope="scope">
                        <el-button-group>
                            <!-- 删除按钮 -->
                            <el-button type="danger" @click="deleteData(scope.row.token)" icon="delete" size="small">删除</el-button>
                        </el-button-group>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>

        <!-- 分页器 -->
        <el-row type="flex" justify="space-around" style="margin-top: 30px">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :page-sizes="[10, 20, 30, 40]"  
                :page-size="listQuery.pageSize"  
                layout="total, sizes, prev, pager, next, jumper"  
                :total="total">
            </el-pagination>
        </el-row>
    </el-row>
</template>

<script>
    import { userList, deleteUser } from '@/api/user'  // 导入用户列表和删除用户接口
    import { parseTime } from '@/utils/time';  // 导入时间解析函数

    export default {
        data() {
            return {
                list: null,  // 列表数据
                total: 0,  // 总数据条目数
                listLoading: true,  // 列表加载状态
                listQuery:{  // 列表查询参数
                    offset: 0,  // 偏移量
                    pageSize: 10,  // 每页数量
                    token: localStorage.getItem('token')  // 用户令牌
                }
            }
        },
        created() {
            this.fetchData();  // 组件创建时获取数据
        },
        methods: {
            fetchData() {
                this.listLoading = true;  // 开始加载数据
                userList(this.listQuery).then(response => {
                    this.list = response.data.item;  // 设置列表数据
                    this.total = response.data.total;  // 设置总数据条目数
                    this.listLoading = false;  // 加载完成
                });
            },
            deleteData(token) {
                this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //this.list[index].orderCustomer.status;
                    deleteUser(token).then(response => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.fetchData();  // 删除成功后重新获取数据
                    });
                });
            },
            createData(){
                this.$router.push('/home/user/add');  // 跳转到添加用户页面
            },
            handleSizeChange(val) {
                this.listQuery.pageSize = val;  // 改变每页数量
                this.fetchData();  // 重新获取数据
            },
            handleCurrentChange(val) {
                this.listQuery.offset = this.listQuery.pageSize * (val -1);  // 改变偏移量
                this.fetchData();  // 重新获取数据
            }
        },
        filters: {
            time: function (value) {
                if(value == null || value =="")
                    return "";
                return parseTime(value,"{y}-{m}-{d}");  // 格式化时间
            }
        }
    };
</script>

<style>
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 150px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
    }
</style>
