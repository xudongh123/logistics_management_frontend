<template>
    <el-row v-loading.body="listLoading" element-loading-text="正在提交，请稍后...">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '../../home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '../car' }">车辆管理</el-breadcrumb-item>
            <el-breadcrumb-item>增加车辆</el-breadcrumb-item>
        </el-breadcrumb>

        <el-col style="margin-top: 50px">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <el-row>
                    <el-col :span="7">
                        <el-form-item label="车牌号" prop="plate">
                            <el-input v-model="ruleForm.plate" placeholder="请输入车牌号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="车辆类型" prop="type">
                            <el-input v-model="ruleForm.type" placeholder="请输入车辆类型"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="7">
                        <el-form-item label="车辆所属" prop="resource">
                            <el-radio-group v-model="ruleForm.resource">
                                <el-radio class="radio" label="自有">自有</el-radio>
                                <el-radio class="radio" label="第三方">第三方</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="7">
                        <el-form-item label="随车司机姓名" prop="driverName">
                            <el-input v-model="ruleForm.driverName">
                                <!-- <el-button slot="append" icon="search" @click="onSelectDriver"></el-button> -->
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="随车电话">
                            <el-input v-model="ruleForm.driverPhone"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="7">
                        <el-form-item label="挂车车牌">
                            <el-input v-model="ruleForm.twoPlate"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="7">
                        <el-form-item label="能耗类型">
                            <el-input v-model="ruleForm.energy"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="车辆长度">
                            <el-input v-model="ruleForm.length"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="核定载重">
                            <el-input v-model="ruleForm.weight">
                                <template slot="append">吨</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="7">
                        <el-form-item label="汽车VIN码">
                            <el-input v-model="ruleForm.vin"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="车辆品牌">
                            <el-input v-model="ruleForm.brand"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="发动机号">
                            <el-input v-model="ruleForm.engine"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="7">
                        <el-form-item label="车轴数">
                            <el-input v-model="ruleForm.axle"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="轴距">
                            <el-input v-model="ruleForm.wheelbase"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="轮胎数量">
                            <el-input v-model="ruleForm.tire"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="7">
                        <el-form-item label="出厂日期">
                            <el-date-picker
                                type="date" placeholder="选择日期"
                                            :value="ruleForm.factoryTime"
                                            @input="ruleForm.factoryTime = $event"
                                            style="width: 100%;" format="yyyy-MM-dd">
                            </el-date-picker>
                        </el-form-item>

                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="购买日期">
                            <el-date-picker type="date" placeholder="选择日期"
                                            :value="ruleForm.buyTime"
                                            @input="ruleForm.buyTime = $event"
                                            style="width: 100%;" format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="购买价格">
                            <el-input v-model="ruleForm.buyPrice"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="7">
                        <el-form-item label="年审日期">
                            <el-date-picker type="date" placeholder="选择日期"
                                            :value="ruleForm.limitedTime"
                                            @input="ruleForm.limitedTime = $event"
                                            style="width: 100%;" format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="7">
                        <el-form-item label="保险有效期">
                            <el-date-picker type="date" placeholder="选择日期"
                                            :value="ruleForm.insuranceTime"
                                            @input="ruleForm.insuranceTime = $event"
                                            style="width: 100%;" format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="车辆备注">
                            <el-input type="textarea" v-model="ruleForm.remark"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-form-item style="margin-top: 30px" >
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>

                <!-- <my-driver-choise @onselect="onSelectDriverSubmit" :mtoken="mtoken" ref="myDriverChoise"></my-driver-choise> -->
            </el-form>
        </el-col>

    </el-row>
</template>
<script>
    import { addCar } from '@/api/car';

    export default {
        components: {
            MyDriverChoise
        },
        data() {
            return {
                ruleForm: {
                    plate: '',
                    type: '',
                    resource: '',
                    twoPlate: '',
                    driverPhone: '',
                    driverName: '',
                    energy: '',
                    length: '',
                    weight: '',
                    vin: '',
                    brand: '',
                    engine: '',
                    axle: '',
                    wheelbase: '',
                    tire: '',
                    factoryTime: null,
                    buyTime: null,
                    buyPrice: '',
                    limitedTime: null,
                    insuranceTime: null,
                    remark: '',
                    token: localStorage.getItem('token')
                },
                rules: {
                    plate: [
                        {required: true, message: '请输入车牌'}
                    ],
                    type: [
                        {required: true, message: '选择车辆类型'}
                    ],
                    resource: [
                        {required: true, message: '请选择'}
                    ],
                    driverName: [
                        {required: true, message: '请输入司机姓名'}
                    ]
                },
                listLoading: false,
                uploadToken: {
                    token:''
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.listLoading = true;
                        addCar(this.ruleForm).then(response => {
                            this.listLoading = false;
                            this.$message({
                                type: 'success',
                                message: '添加成功!'
                            });
                            this.$router.push('../car');
                        },
                        error =>{
                            this.listLoading = false;
                        });
                    } else {
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
            // onSelectDriver(){
            //     this.$refs.myDriverChoise.show();
            // },
            // onSelectDriverSubmit(row){
            //     this.ruleForm.driver_name = row.fleetDriver.name;
            //     this.ruleForm.driver_phone = row.fleetDriver.phone;
            // }
        },
        filters: {
            // day: function (value) {
            //     return parseTime(value,"{y}/{m}/{d}");
            // }
        }
    }
</script>
