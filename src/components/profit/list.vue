<template>
    <!-- 面包屑导航 -->
    <el-row>
        <el-row>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '../home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>费用跟踪</el-breadcrumb-item>
            </el-breadcrumb>
        </el-row>

        <!-- 表格展示费用信息 -->
        <el-row style="margin-top: 10px">
            <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit
                      highlight-current-row style="width: 100%">
                <el-table-column type="index" label="" width="60"/>
                <el-table-column label="订单编号" width="180">
                    <template scope="scope">
                        {{ scope.row.id }}
                    </template>
                </el-table-column>
                <el-table-column prop="receive" label="应收账款"/>
                <el-table-column prop="pay" label="应付账款"/>
                <el-table-column label="已收账款">
                    <template scope="scope">
                        <el-tag type="primary"> {{scope.row.receiveNow}} 元</el-tag>
                        <el-tag type="primary" v-if="scope.row.isReceive"> 完成 </el-tag>
                        <el-tag type="danger" v-if="!scope.row.isReceive"> 未完成 </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="已付账款">
                    <template scope="scope">
                        <el-tag type="primary"> {{scope.row.payNow}} 元</el-tag>
                        <el-tag type="primary" v-if="scope.row.isPay"> 完成 </el-tag>
                        <el-tag type="danger" v-if="!scope.row.isPay"> 未完成 </el-tag>
                    </template>
                </el-table-column>

                <!-- 操作列，可进行收款和付款操作 -->
                <el-table-column label="操作" width="180">
                    <template scope="scope">
                        <el-button-group>
                            <el-button type="primary" @click="showDialog('receive',scope.row)" icon="caret-left" size="small" v-if="!scope.row.isReceive">收款</el-button>
                            <el-button type="danger" @click="showDialog('pay',scope.row)" icon="caret-right" size="small" v-if="!scope.row.isPay">付款</el-button>
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

        <!-- 增加收款对话框 -->
        <el-dialog title="增加收款" :visible.sync="receiveDialog.isDialogShow">
            <el-form :model="receiveDialog">
                <el-form-item label="应收账款">
                    <el-input v-model="receiveDialog.receive" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="已收款">
                    <el-input-number v-model="receiveDialog.receiveNow" ></el-input-number>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="receiveDialog.isDialogShow = false">取 消</el-button>
                <el-button type="primary" @click="receive()">确 定</el-button>
            </div>
        </el-dialog>

        <!-- 增加付款对话框 -->
        <el-dialog title="增加付款" :visible.sync="payDialog.isDialogShow">
            <el-form :model="payDialog">
                <el-form-item label="应付账款">
                    <el-input v-model="payDialog.pay" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="已付款">
                    <el-input-number v-model="payDialog.payNow" ></el-input-number>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="payDialog.isDialogShow = false">取 消</el-button>
                <el-button type="primary" @click="pay()">确 定</el-button>
            </div>
        </el-dialog>
    </el-row>
</template>

<script>
    // 导入相关组件和工具函数
    import { getProfitList, addPay, addReceive } from '@/api/profit';
    import { parseTime } from '@/utils/time';

    // 组件定义
    export default {
        data() {
            return {
                list: null,
                total: 0,
                listLoading: true,
                listQuery:{
                    offset: 0,
                    pageSize: 10,
                    token: localStorage.getItem('token')
                },
                payForm:{
                    pay: '',
                    isPay: false
                },
                receiveForm:{
                    receive: '',
                    isReceive: false
                },
                receiveDialog: {
                    isDialogShow: false,
                    receive: '',
                    receiveNow: '',
                    id: ''
                },
                payDialog: {
                    isDialogShow: false,
                    pay: '',
                    payNow: '',
                    id: ''
                },
            }
        },
        created() {
            this.fetchData();
        },
        methods: {
            // 获取数据
            fetchData() {
                this.listLoading = true;
                getProfitList(this.listQuery).then(response => {
                    this.list = response.data.item;
                    this.total = response.data.total;
                    this.listLoading = false;
                });
            },
            // 处理收款操作
            receive(){
                const receiveNow = parseFloat(this.receiveDialog.receiveNow);
                const receive = parseFloat(this.receiveDialog.receive)
                if (receiveNow > receive || receiveNow == receive) {
                    this.receiveForm.isReceive = true;
                } else {
                    this.receiveForm.isReceive = false;
                }
                this.receiveForm.receive = this.receiveDialog.receiveNow;
                addReceive(this.receiveDialog.id, this.receiveForm).then(response => {
                    this.receiveDialog.isDialogShow = false;
                    this.fetchData();
                });
            },
            // 处理付款操作
            pay(){
                const payNow = parseFloat(this.payDialog.payNow);
                const pay = parseFloat(this.payDialog.pay);
                if (payNow > pay || payNow == pay) {
                    this.payForm.isPay = true;
                } else {
                    this.payForm.isPay = false;
                }
                this.payForm.pay = this.payDialog.payNow;
                addPay(this.payDialog.id, this.payForm).then(response => {
                    this.payDialog.isDialogShow = false;
                    this.fetchData();
                });
            },
            // 显示收款或付款对话框
            showDialog(type,row){
                if (type == 'pay') {
                    this.payDialog.isDialogShow = true;
                    this.payDialog.id = row.id;
                    this.payDialog.pay = row.pay;
                } else {
                    this.receiveDialog.isDialogShow = true;
                    this.receiveDialog.id = row.id;
                    this.receiveDialog.receive = row.receive;
                }
            },
            // 处理分页大小变化
            handleSizeChange(val) {
                this.listQuery.pageSize = val;
                this.fetchData();
            },
            // 处理当前页数变化
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
        },
        filters: {
            // 时间格式化过滤器
            // time: function (value) {
            //     if(value == null || value =="")
            //         return "";
            //     return parseTime(value,"{y}-{m}-{d}");
            // }
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
