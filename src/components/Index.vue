<template>
    <!-- el-row 行布局组件 -->
    <el-row>
        <el-row>
            <!-- el-breadcrumb 面包屑导航组件 -->
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>首页</el-breadcrumb-item>
            </el-breadcrumb>

            <!-- el-row 嵌套 el-col，展示订单统计信息 -->
            <el-row style="margin-top: 20px" :gutter="20" v-loading.body="all_Loading" element-loading-text="请稍后...">
                <!-- el-col 列布局组件 -->
                <el-col :span="6">
                    <el-card class="box-card" :body-style="{ padding: '0px' }">
                        <el-row>
                            <el-col :span="2"><div style="height:80px; background:#3498db"></div></el-col>
                            <el-col :span="16" style="padding: 10px">
                                <p>总订单数：</p>
                                <p style="margin-top:10px; font-size:25px;"><router-link to="/home/order" style="color:#50bfff">{{all.totalOrderCount}}</router-link></p>
                            </el-col>
                        </el-row>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card class="box-card" :body-style="{ padding: '0px' }">
                        <el-row>
                            <el-col :span="2"><div style="height:80px; background:#9b59b6"></div></el-col>
                            <el-col :span="16" style="padding: 10px">
                                <p>待处理订单数：</p>
                                <p style="margin-top:10px; font-size:25px;"><router-link to="/home/order" style="color:#50bfff">{{all.orderPlaceCount}}</router-link></p>

                            </el-col>
                        </el-row>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card class="box-card" :body-style="{ padding: '0px' }">
                        <el-row>
                            <el-col :span="2"><div style="height:80px; background:#2ecc71"></div></el-col>
                            <el-col :span="16" style="padding: 10px">
                                <p>已处理订单数：</p>
                                <p style="margin-top:10px; font-size:25px;"><router-link to="/home/order" style="color:#50bfff">{{all.orderTakingCount}}</router-link></p>
                            </el-col>
                        </el-row>
                    </el-card>
                </el-col>
                <el-col :span="6">
                    <el-card class="box-card" :body-style="{ padding: '0px' }">
                        <el-row>
                            <el-col :span="2"><div style="height:80px; background:#f1c40f"></div></el-col>
                            <el-col :span="16" style="padding: 10px">
                                <p>已签收订单数：</p>
                                <p style="margin-top:10px; font-size:25px;"><router-link to="/home/order" style="color:#50bfff">{{all.orderSignCount}}</router-link></p>
                            </el-col>
                        </el-row>
                    </el-card>
                </el-col>
            </el-row>

            <!-- el-row 展示订单数据图表 -->
            <el-row>
                <el-card class="box-card" style="margin-top: 20px">
                    <div id="order_day7" style="height: 400px"></div>
                </el-card>
            </el-row>

            <el-row>
                <el-card class="box-card" style="margin-top: 20px">
                    <div id="order_pie" style="height: 600px"></div>
                </el-card>
            </el-row>
        </el-row>
    </el-row>
</template>

<script>
    // 引入相关依赖及样式
    import { getOrderCount, getOrderCount7Day } from '@/api/order'
    import echarts from 'echarts'
    require('echarts/theme/macarons');

    export default {
        data() {
            return {
                // 数据及状态初始化
                request:{
                    token: localStorage.getItem('token')
                },
                all_Loading: false,
                all:{},
                order_day7:{},
            }
        },
        created() {
            // 组件创建时执行
        },
        mounted(){
            // 组件挂载完成后执行初始化方法
            this.initAll();
            this.initOrderDay7();
        },
        methods:{
            // 初始化所有订单数据
            initAll(){
                // 发起请求获取订单数据
                this.all_Loading = true;
                getOrderCount(this.request).then(response => {
                    // 处理返回数据并渲染echarts图表
                    this.all = response.data;
                    this.all_Loading = false;
                    var myChart_pie = echarts.init(document.getElementById('order_pie'),'macarons');
                    // 绘制饼图
                    myChart_pie.setOption({
                        title : {
                            text: '订单分布比例',
                            x:'center'
                        },
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        legend: {
                            orient: 'vertical',
                            left: 'left',
                            data: ['拒绝订单', '待处理订单', '已处理订单','已签收订单']
                        },
                        series : [
                            {
                                name: '订单分布比例',
                                type: 'pie',
                                radius : '70%',
                                center: ['50%', '60%'],
                                data:[
                                    {value:this.all.orderRefuseCount, name:'拒绝订单'},
                                    {value:this.all.orderPlaceCount, name:'待处理订单'},
                                    {value:this.all.orderTakingCount, name:'已处理订单'},
                                    {value:this.all.orderSignCount, name:'已签收订单'},
                                ],
                                itemStyle: {
                                    emphasis: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                }
                            }
                        ]
                    });
                });
            },
            // 初始化最近7天订单数据
            initOrderDay7(){
                // 发起请求获取最近7天订单数据
                getOrderCount7Day(this.request).then(response => {
                    // 处理返回数据并渲染echarts图表
                    this.order_day7 = response.data;
                    var myChart = echarts.init(document.getElementById('order_day7'),'macarons');
                    // 绘制图表
                    myChart.setOption({
                        title: {
                            text: '最近7天订单情况'
                        },
                        tooltip : {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'cross',
                                label: {
                                    backgroundColor: '#6a7985'
                                }
                            }
                        },
                        legend: {
                            data:['新提交订单','处理订单','签收订单']
                        },
                        toolbox: {
                            feature: {
                                saveAsImage: {}
                            }
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis : [
                            {
                                type : 'category',
                                boundaryGap : false,
                                data : this.order_day7.timeList
                            }
                        ],
                        yAxis : [
                            {
                                type : 'value'
                            }
                        ],
                        series : [
                            {
                                name:'新提交订单',
                                type:'line',
                                stack: '总量',
                                areaStyle: {normal: {}},
                                data:this.order_day7.placeCount
                            },
                            {
                                name:'处理订单',
                                type:'line',
                                stack: '总量',
                                areaStyle: {normal: {}},
                                data:this.order_day7.takingCount
                            },
                            {
                                name:'签收订单',
                                type:'line',
                                stack: '总量',
                                areaStyle: {normal: {}},
                                data:this.order_day7.signCount
                            },
                        ]
                    });
                });
            }
        }
    }
</script>
