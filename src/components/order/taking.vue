<!-- 模板部分 -->
<template>
    <el-row
        v-loading.body="listLoading"
        element-loading-text="正在操作，请稍后..."
    >
        <!-- 面包屑导航 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '../../home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '../order_manager' }">运单管理</el-breadcrumb-item>
            <el-breadcrumb-item>派车</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 步骤条 -->
        <el-row style="margin-top: 30px">
            <el-row type="flex" justify="center">
                <el-steps :space="300" :active="2">
                    <el-step title="下单"></el-step>
                    <el-step title="接单运输"></el-step>
                    <el-step title="签收"></el-step>
                </el-steps>
            </el-row>

            <!-- 寄件人和收件人信息卡片 -->
            <el-card class="box-card" style="margin-top: 30px">
                <el-form label-width="150px">
                    <!-- 寄件人信息 -->
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="寄件人姓名">
                                <p>{{ order.orderCustomer.sendName }}</p>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="寄件人手机号">
                                <p>{{ order.orderCustomer.sendPhone }}</p>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="寄件人地址">
                                <p>{{ order.orderCustomer.sendAddr }}</p>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="寄件人详细地址">
                                <p>{{ order.orderCustomer.sendAddrInfo }}</p>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="收件人姓名">
                                <p>{{ order.orderCustomer.receiveName }}</p>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="收件人手机号">
                                <p>{{ order.orderCustomer.receivePhone }}</p>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="收件人地址">
                                <p>{{ order.orderCustomer.receiveAddr }}</p>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="收件人详细地址">
                                <p>{{ order.orderCustomer.receiveAddrInfo }}</p>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="配送方式">
                                <p>{{ order.orderCustomer.dispatchingType }}</p>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="预计发货日期">
                                <p>{{ order.orderCustomer.sendTime | day }}</p>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="限时到达日期">
                                <p>
                                    {{ order.orderCustomer.receiveTime | day }}
                                </p>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-card>

            <!-- 货物信息表格 -->
            <el-card class="box-card" style="margin-top: 30px">
                <el-form
                    :model="taking"
                    :rules="rules"
                    ref="taking"
                    label-width="150px"
                >
                    <el-table :data="taking.goods" border style="width: 100%">
                        <el-table-column prop="name" label="货物名称">
                        </el-table-column>
                        <el-table-column prop="weight" label="货物重量(吨)">
                        </el-table-column>
                        <el-table-column prop="size" label="货物尺寸">
                        </el-table-column>
                        <el-table-column prop="number" sortable label="数量">
                        </el-table-column>
                        <el-table-column prop="remark" label="备注">
                        </el-table-column>
                        <el-table-column sortable label="运费">
                            <template scope="scope">
                                <el-input-number
                                    v-model="scope.row.freight"
                                ></el-input-number>
                            </template>
                        </el-table-column>
                    </el-table>
                    
                    <el-input
                        v-model="taking.fk_driver_id"
                        type="hidden"
                    ></el-input>
                    <el-input
                        v-model="taking.fk_car_id"
                        type="hidden"
                    ></el-input>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="应收账款" prop="receive">
                                <el-input-number
                                    v-model="taking.receive"
                                    style="width: 100%"
                                ></el-input-number>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <!-- <el-row>
                        <el-col :span="8">
                            <el-form-item label="保险费用" prop="safes">
                                <el-input-number v-model="taking.safes" style="width: 100%"></el-input-number>
                            </el-form-item>
                        </el-col>
                    </el-row> -->
                    <!-- <el-row>
                        <el-col :span="8">
                            <el-form-item label="选择司机" prop="driver">
                                <el-input v-model="taking.driver" @focus="onSelectDriver"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="选择车辆" prop="car">
                                <el-input v-model="taking.car" @focus="onSelectCar"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row> -->
                    <el-row>
                        <!-- <el-col :span="8">
                            <el-form-item label="应收账款" prop="receive">
                                <el-input v-model="receive" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col> -->
                        <el-col :span="8">
                            <el-form-item label="应付账款" prop="pay">
                                <el-input-number
                                    v-model="taking.pay"
                                    style="width: 100%"
                                ></el-input-number>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-form-item>
                        <el-button
                            type="primary"
                            @click="submitForm('taking')"
                            icon="upload"
                            >立即派车</el-button
                        >
                    </el-form-item>
                </el-form>
            </el-card>
        </el-row>
    </el-row>
</template>

<!-- 脚本部分 -->
<script>
import { getOrder, takingOrder } from "@/api/order";
import { parseTime } from "@/utils/time";

export default {
    // 数据部分
    data() {
        return {
            mtoken: localStorage.getItem("token"),
            listLoading: false,
            order_id: this.$route.query.id,
            order: {},
            taking: {
                token: localStorage.getItem("token"),
                id: this.$route.query.id,
                receive: 0,
                pay: 0,
                freight: 0,
                goods: {},
            },
            rules: {
                car: [{ required: true, message: "请选择车辆" }],
                driver: [{ required: true, message: "请选择司机" }],
                receive: [{ required: true, message: "请填写应收款" }],
                pay: [{ required: true, message: "请填写应付款" }],
                freight: [{ required: true, message: "运费不能为空" }],
                safes: [{ required: true, message: "保险费用不能为空" }],
            },
        };
    },
    created() {
        this.fetchData();
    },
    // 方法部分
    methods: {
        fetchData() {
            this.listLoading = true;
            getOrder(this.order_id).then((response) => {
                this.order = response.data;
                this.taking.goods = this.order.orderGoods;
                this.listLoading = false;
            });
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.listLoading = true;
                    delete this.taking.goods;
                    takingOrder(this.taking).then(
                        (response) => {
                            this.listLoading = false;
                            this.$message({
                                type: "success",
                                message: "派车成功!",
                            });
                            this.$router.push("/home/order");
                        },
                        (error) => {
                            this.listLoading = false;
                        }
                    );
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
    },
    // 过滤器部分
    filters: {
        time: function (value) {
            return parseTime(value);
        },
        day: function (value) {
            return parseTime(value, "{y}年{m}月{d}日");
        },
    },
    // 计算属性部分
    computed: {
        // receive: function () {
        //     debugger
        //     this.taking.receive = this.taking.freight + this.taking.safes;
        //     return this.taking.receive;
        // },
        freight: function () {
            this.taking.freight = 0;
            this.taking.goods.forEach((goods) => {
                debugger;
                this.taking.freight += goods.freight;
            });
            return this.taking.freight;
        },
    },
};
</script>
