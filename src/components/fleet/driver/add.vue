<template>
    <el-row v-loading.body="listLoading" element-loading-text="正在提交，请稍后...">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '../../home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '../driver' }">司机管理</el-breadcrumb-item>
            <el-breadcrumb-item>增加司机</el-breadcrumb-item>
        </el-breadcrumb>

        <el-col style="margin-top: 50px">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="姓名" prop="name">
                            <el-input v-model="ruleForm.name" placeholder="请输入司机姓名"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="手机号" prop="phone">
                            <el-input v-model="ruleForm.phone" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="任务短信通知">
                            <el-switch v-model="ruleForm.isSms" on-text="是" off-text="否"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="性别" prop="sex">
                            <el-radio-group v-model="ruleForm.sex">
                                <el-radio class="radio" label="男"></el-radio>
                                <el-radio class="radio" label="女"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="银行卡号">
                            <el-input v-model="ruleForm.bankNumber" placeholder="确认银行卡号码"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" >
                        <el-form-item label="开户行">
                            <el-input v-model="ruleForm.bankAddr"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="籍贯">
                            <el-input v-model="ruleForm.hometown"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="邮箱">
                            <el-input v-model="ruleForm.email"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="身份证">
                            <el-input v-model="ruleForm.idCard"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="备注">
                            <el-input type="textarea" v-model="ruleForm.remark"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-form-item>
                    <el-row style="margin-top: 10px">
                        <el-button type="success" @click="submitForm('ruleForm')">立即创建</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-row>
                </el-form-item>
            </el-form>
        </el-col>

    </el-row>
</template>
<script>
    import { addDriver } from '@/api/driver';

    export default {
        data() {
            return {
                ruleForm: {
                    name: '',
                    sex: '男',
                    phone: '',
                    bankAddr: '',
                    bankNumber: '',
                    isSms: false,
                    idCard: '',
                    email: '',
                    hometown: '',
                    remark: '',
                    token: localStorage.getItem('token')
                },
                rules: {
                    name: [
                        {required: true, message: '请输姓名'},
                        {min: 2, max: 5, message: '长度在 2 到 5 个字符'}
                    ],
                    phone: [
                        {required: true, message: '请填写手机号码'},
                        {min: 11,max: 11, message: '手机号码长度为11位'}
                    ],
                    sex: [
                        {required: true, message: '请选择性别'}
                    ],
                },
                listLoading: false,
            };
        },
        created(){
            this.fetchData();
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.listLoading = true;
                        addDriver(this.ruleForm).then(response => {
                            this.listLoading = false;
                            this.$message({
                                type: 'success',
                                message: '添加成功!'
                            });
                            this.$router.push('../driver');
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
        }
    }
</script>
