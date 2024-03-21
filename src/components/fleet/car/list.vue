<!-- 面包屑导航，用于展示页面路径 -->
<template>
    <el-row>
        <el-row>
            <!-- 面包屑导航项，点击跳转到首页 -->
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '../home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>车辆管理</el-breadcrumb-item>
            </el-breadcrumb>
        </el-row>

        <!-- 添加车辆按钮 -->
        <el-row style="margin-top: 10px">
            <el-button style="float: right;" type="primary" @click="createData()">添加车辆</el-button>
        </el-row>

        <!-- 车辆列表展示表格 -->
        <el-row style="margin-top: 10px">
            <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit
                      highlight-current-row style="width: 100%">
                <el-table-column type="expand">
                    <!-- 展开行显示的内容 -->
                    <template scope="props">
                        <el-form label-position="left" class="demo-table-expand">
                            <el-col :span="8">
                                <!-- 车辆信息展示 -->
                                <el-form-item label="车牌号">
                                    <span>{{ props.row.plate }}</span>
                                </el-form-item>
                                <el-form-item label="创建时间">
                                    <span>{{ props.row.time | time }}</span>
                                </el-form-item>
                                <el-form-item label="车辆类型">
                                    <span>{{ props.row.type }}</span>
                                </el-form-item>
                                <el-form-item label="车辆所属">
                                    <span>{{ props.row.resource }}</span>
                                </el-form-item>
                                <el-form-item label="挂车车牌">
                                    <span>{{ props.row.twoPlate }}</span>
                                </el-form-item>
                                <el-form-item label="随车电话">
                                    <span>{{ props.row.driverPhone }}</span>
                                </el-form-item>
                                <el-form-item label="随车司机">
                                    <span>{{ props.row.driverName }}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="能耗类型">
                                    <span>{{ props.row.energy }}</span>
                                </el-form-item>
                                <el-form-item label="车辆长度">
                                    <span>{{ props.row.length }}</span>
                                </el-form-item>
                                <el-form-item label="核定载重吨">
                                    <span>{{ props.row.weight }}</span>
                                </el-form-item>
                                <el-form-item label="汽车VIN码">
                                    <span>{{ props.row.vin }}</span>
                                </el-form-item>
                                <el-form-item label="车辆品牌">
                                    <span>{{ props.row.brand }}</span>
                                </el-form-item>
                                <el-form-item label="发动机号">
                                    <span>{{ props.row.engine }}</span>
                                </el-form-item>
                                <el-form-item label="车轴数">
                                    <span>{{ props.row.axle }}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="轴距">
                                    <span>{{ props.row.wheelbase }}</span>
                                </el-form-item>
                                <el-form-item label="轮胎数量">
                                    <span>{{ props.row.tire }}</span>
                                </el-form-item>
                                <el-form-item label="出厂日期">
                                    <span>{{ props.row.factoryTime | time}}</span>
                                </el-form-item>
                                <el-form-item label="购买日期">
                                    <span>{{ props.row.buyTime | time }}</span>
                                </el-form-item>
                                <el-form-item label="购买价格">
                                    <span>{{ props.row.buyPrice }}</span>
                                </el-form-item>
                                <el-form-item label="年审日期">
                                    <span>{{ props.row.limitedTime | time }}</span>
                                </el-form-item>
                            </el-col>
                        </el-form>
                    </template>
                </el-table-column>
                <!-- 列配置 -->
                <el-table-column prop="plate" label="车牌号"/>
                <el-table-column prop="type" label="车辆类型"/>
                <el-table-column prop="brand" label="车辆品牌"/>
                <el-table-column
                    label="车辆所属">
                    <template scope="scope">
                        <el-tag type="primary" >{{scope.row.resource}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                    label="添加时间">
                    <template scope="scope">
                        <p>{{scope.row.time | time}}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="remark" label="备注"/>

                <el-table-column label="操作" width="180">
                    <template scope="scope">

                        <el-button-group>
                            <!-- 删除按钮 -->
                            <el-button type="danger" @click="deleteData(scope.row.id)" icon="delete" size="small">删除</el-button>
                        </el-button-group>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>

        <!-- 分页组件 -->
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

<!-- 页面脚本部分 -->
<script>
    import { getCarList, deleteCar } from '@/api/car';
    import { parseTime } from '@/utils/time';

    export default {
        data() {
            return {
                // 列表数据和分页信息
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
        created() {
            // 初始化页面数据
            this.fetchData();
        },
        methods: {
            // 获取车辆列表数据
            fetchData() {
                this.listLoading = true;
                getCarList(this.listQuery).then(response => {
                    this.list = response.data.item;
                    this.total = response.data.total;
                    this.listLoading = false;
                });
            },
            // 删除车辆信息
            deleteData(id) {
                // 弹出确认对话框
                this.$confirm('此操作将删除该车辆, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // 执行删除操作
                    deleteCar(id).then(response => {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.fetchData();
                    });
                });
            },
            // 跳转到添加车辆页面
            createData(){
                this.$router.push('/home/car/add');
            },
            // 处理每页显示数量变化
            handleSizeChange(val) {
                this.listQuery.pageSize = val;
                this.fetchData();
            },
            // 处理当前页变化
            handleCurrentChange(val) {
                this.listQuery.offset = this.listQuery.pageSize * (val -1);
                this.fetchData();
            }
        },
        filters: {
            // 时间格式化过滤器
            time: function (value) {return parseTime(value, "{y}年{m}月{d}日 {hh}:{mm}:{ss}");}
        }
    };
</script>

<!-- 页面样式 -->
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
