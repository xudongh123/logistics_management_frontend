<template>
    <el-row>
        <!-- 面包屑导航 -->
        <el-row>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '../home' }">货单管理</el-breadcrumb-item>
                <el-breadcrumb-item>我的货单</el-breadcrumb-item>
            </el-breadcrumb>
        </el-row>

        <!-- 数据列表展示 -->
        <el-row style="margin-top: 10px">
            <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit
                      highlight-current-row style="width: 100%">
                <!-- 序号列 -->
                <el-table-column fixed
                                 type="index"
                                 width="50">
                </el-table-column>
                <!-- 订单号列 -->
                <el-table-column label="订单号" width="300">
                    <template scope="scope">
                        {{ scope.row.orderNumber }}
                    </template>
                </el-table-column>
                <!-- 发货人信息列 -->
                <el-table-column label="发货人" width="250">
                    <template scope="scope">
                        <div style="margin-top:10px;margin-bottom: 10px">
                            <p>姓名：{{scope.row.sendName}}</p>
                            <p>手机：{{scope.row.sendPhone}}</p>
                            <p>地址：{{scope.row.sendAddr}}</p>
                        </div>
                    </template>
                </el-table-column>
                <!-- 收货人信息列 -->
                <el-table-column label="收货人" width="250">
                    <template scope="scope">
                        <div style="margin-top:10px;margin-bottom: 10px">
                            <p>姓名：{{scope.row.receiveName}}</p>
                            <p>手机：{{scope.row.receivePhone}}</p>
                            <p>地址：{{scope.row.receiveAddr}}</p>
                        </div>
                    </template>
                </el-table-column>
                <!-- 订单状态列 -->
                <el-table-column label="订单状态" width="150">
                    <template scope="scope">
                        <el-tag type="gray" v-show="scope.row.status ==='ORDER_PLACE'">未处理</el-tag>
                        <el-tag type="primary" v-show="scope.row.status ==='ORDER_TAKING'">运输中</el-tag>
                        <el-tag type="success" v-show="scope.row.status ==='ORDER_SIGN'">已签收</el-tag>
                        <el-tag type="danger" v-show="scope.row.status ==='ORDER_REFUSE'">已拒绝</el-tag>
                    </template>
                </el-table-column>
                <!-- 时间信息列 -->
                <el-table-column label="时间" width="300">
                    <template scope="scope" >
                        <p><el-tag type="gray">下单时间：{{scope.row.time|time}}</el-tag></p>
                        <p><el-tag type="primary">预计发货：{{scope.row.sendTime|time}}</el-tag></p>
                        <p><el-tag type="success">预计送达：{{scope.row.receiveTime|time}}</el-tag></p>
                    </template>
                </el-table-column>
                <!-- 操作列 -->
                <el-table-column label="操作" width="180" fixed="right">
                    <template scope="scope">
                        <el-row v-if="scope.row.status ==='ORDER_PLACE'"  type="flex" justify="space-around">
                            <el-button-group>
                                <el-button type="info" icon="plus" size="small" @click="taking(scope.row.id)">派车</el-button>
                                <el-button type="warning" icon="delete" size="small" @click="refuse(scope.row.id)">拒绝 </el-button>
                            </el-button-group>
                        </el-row>
                        <el-row v-if="scope.row.status ==='ORDER_TAKING'"  type="flex" justify="space-around">
                            <el-button type="success" size="small" icon="circle-check" @click="sign(scope.row.id)">签收</el-button>
                        </el-row>
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
    // 引入相关数据请求和工具函数
    import { refuseOrder, addSignOrder, deleteOrder, getOrderList } from '@/api/order';
    import { parseTime } from '@/utils/time';

    export default {
        data() {
            return {
                // 数据列表
                list: null,
                // 总数
                total: 0,
                // 加载状态
                listLoading: true,
                // 列表查询条件
                listQuery:{
                    offset: 0,
                    pageSize: 10,
                    token:localStorage.getItem('token')
                },
                // 拒绝订单表单
                refuseForm:{
                    token:localStorage.getItem('token'),
                },
                // 签收订单表单
                signForm:{
                    token:localStorage.getItem('token'),
                },
                dialogFormVisible:false,
                imagePercente: 0,
                uploadToken: {
                    token:''
                },
            }
        },
        // 组件创建时调用
        created() {
            this.fetchData();
        },
        methods: {
            // 获取数据
            fetchData() {
                this.listLoading = true;
                getOrderList(this.listQuery).then(response => {
                    this.list = response.data.item;
                    this.total = response.data.total;
                    this.listLoading = false;
                });
            },
            // 每页显示条数变化
            handleSizeChange(val) {
                this.listQuery.pageSize = val;
                this.fetchData();
            },
            // 当前页变化
            handleCurrentChange(val) {
                this.listQuery.offset = this.listQuery.pageSize * (val -1);
                this.fetchData();
            },
            // 查看订单详情
            onOrder(id){
                this.$router.push({
                    path:'/home/order/info',
                    query:{
                        id: id
                    },
                });
            },
            // 派车
            taking(id){
                this.$router.push({
                    path:'/home/order/taking',
                    query:{
                        id: id
                    },
                });
            },
            // 拒绝订单
            refuse(id) {
                this.$confirm('此操作将拒绝该订单, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.refuseForm.id = id;
                    refuseOrder(this.refuseForm).then(response => {
                        this.$message({
                            type: 'success',
                            message: '已经拒绝!'
                        });
                        this.fetchData();
                    });
                });
            },
            // 删除订单
            delete_order(id) {
                this.$confirm('此操作将删除该订单, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.refuseForm.fk_order_customer_id = id;
                    deleteOrder(id).then(response => {
                        this.$message({
                            type: 'success',
                            message: '已经删除!'
                        });
                        this.fetchData();
                    });
                });
            },
            // 签收订单
            sign(id){
                this.$confirm('此操作将签收该订单, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info'
                }).then(() => {
                    this.signForm.id = id;
                    addSignOrder(this.signForm).then(response => {
                        this.$message({
                            type: 'success',
                            message: '签收成功!'
                        });
                        this.fetchData();
                    });
                });
            },
            // 提交签收
            signSubmit(){
                this.dialogFormVisible = false;
                addSignOrder(this.signForm).then(response => {
                    this.$message({
                        type: 'success',
                        message: '签收成功!'
                    });
                    this.fetchData();
                });
            }
        },
        // 时间过滤器
        filters: {
            time: function (value) {
                return parseTime(value,"{y}年{m}月{d}日 {hh}:{mm}:{ss}");
            }
        }
    };
</script>

<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        height: 400px;
        width: 400px;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 400px;
        height: 400px;
        display: block;
    }
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
