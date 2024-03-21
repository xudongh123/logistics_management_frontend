<template>
    <!-- el-row布局容器 -->
    <el-row>
        <el-row>
            <!-- el-breadcrumb面包屑导航 -->
            <el-breadcrumb separator="/">
                <!-- el-breadcrumb-item面包屑导航项 -->
                <!-- 使用:to属性实现路由跳转 -->
                <el-breadcrumb-item :to="{ path: '../home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>司机管理</el-breadcrumb-item>
            </el-breadcrumb>
        </el-row>

        <el-row style="margin-top: 10px">
            <!-- el-button按钮组件 -->
            <!-- 使用style属性设置按钮浮动到右侧 -->
            <el-button style="float: right;" type="primary" @click="createData()">添加司机</el-button>
        </el-row>

        <el-row style="margin-top: 10px">
            <!-- el-table表格组件 -->
            <!-- 使用:data绑定数据源 -->
            <!-- 使用v-loading.body实现加载状态控制 -->
            <!-- 使用element-loading-text设置加载时的文本提示 -->
            <!-- 使用border属性显示表格边框 -->
            <!-- 使用fit属性列宽自适应 -->
            <!-- 使用highlight-current-row属性高亮当前行 -->
            <!-- 使用style属性设置表格宽度 -->
            <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row style="width: 100%">
                <!-- el-table-column表格列组件 -->
                <!-- type="expand"实现展开行功能 -->
                <el-table-column type="expand">
                    <template scope="props">
                        <!-- el-form表单组件 -->
                        <!-- label-position="left"设置标签对齐方式 -->
                        <el-form label-position="left" class="demo-table-expand">
                            <el-col :span="10">
                                <el-form-item label="姓名">
                                    <span>{{ props.row.name }}</span>
                                </el-form-item>
                                <!-- 其他表单项略 -->
                            </el-col>
                            <el-col :span="10">
                                <!-- 其他表单项略 -->
                            </el-col>
                        </el-form>
                    </template>
                </el-table-column>
                <!-- 其他el-table-column表格列组件略 -->
            </el-table>
        </el-row>

        <el-row type="flex" justify="space-around" style="margin-top: 30px">
            <!-- el-pagination分页组件 -->
            <!-- @size-change指定每页条数变化时的回调函数 -->
            <!-- @current-change指定当前页码变化时的回调函数 -->
            <!-- :page-sizes设置每页显示条数选项 -->
            <!-- :page-size绑定每页条数 -->
            <!-- layout属性指定分页布局 -->
            <!-- :total绑定总条数 -->
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
    // 引入模块
    import { getDriverList, deleteDriver } from '@/api/driver';
    import { parseTime } from '@/utils/time';

    // 导出模块
    export default {
        // 数据
        data() {
            return {
                list: null,
                total: 0,
                listLoading: true,
                listQuery:{
                    offset: 0,
                    pageSize: 10,
                    token: localStorage.getItem('token')
                }
            }
        },
        // 生命周期钩子函数
        created() {
            this.fetchData();
        },
        // 方法
        methods: {
            fetchData() {
                this.listLoading = true;
                getDriverList(this.listQuery).then(response => {
                    this.list = response.data.item;
                    console.log(`list: ${JSON.stringify(this.list)}`)
                    this.total = response.data.total;
                    this.listLoading = false;
                });
            },
            // 删除数据方法
            deleteData(id) {
                this.$confirm('此操作将删除该司机, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // 调用删除司机接口
                    deleteDriver(id).then(response => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        // 重新获取数据
                        this.fetchData();
                    });
                });
            },
            // 跳转到添加司机页面
            createData(){
                this.$router.push('/home/driver/add');
            },
            // 每页条数改变回调
            handleSizeChange(val) {
                this.listQuery.pageSize = val;
                this.fetchData();
            },
            // 当前页码改变回调
            handleCurrentChange(val) {
                this.listQuery.offset = this.listQuery.pageSize * (val -1);
                this.fetchData();
            }
        },
        // 过滤器
        filters: {
            // 时间格式化过滤器
            time: function (value) {return parseTime(value, "{y}年{m}月{d}日 {hh}:{mm}:{ss}");}
        }
    };
</script>

<style>
    /* 自定义样式 */
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
