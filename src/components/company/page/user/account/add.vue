<template>
    <el-row v-loading.body="listLoading" element-loading-text="正在提交，请稍后...">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '../../home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '../car' }">账户管理</el-breadcrumb-item>
            <el-breadcrumb-item>增加账户</el-breadcrumb-item>
        </el-breadcrumb>

        <el-col style="margin-top: 50px">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <el-row>
                    <el-col :span="7">
                        <el-form-item label="账户名" prop="username">
                            <el-input v-model="ruleForm.username" placeholder="请输入账户名"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="昵称" prop="nickname">
                            <el-input v-model="ruleForm.nickname" placeholder="请输入昵称"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="7">
                        <el-form-item label="性别" prop="sex">
                            <el-radio-group v-model="ruleForm.sex">
                                <el-radio class="radio" label="男">男</el-radio>
                                <el-radio class="radio" label="女">女</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="7">
                        <el-form-item label="密码" prop="password">
                            <el-input v-model="ruleForm.password"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="7">
                        <el-form-item label="权限等级">
                            <el-input v-model="ruleForm.permissionLevel"></el-input>
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
    import { addUser } from '@/api/user';
    // import { getDefindAll } from "@/api/system";
    // import { getUploadToken } from '@/api/util.js'
    import { parseTime } from '@/utils/time';
    import MyDriverChoise from "@/components/public/fleet/DriverChoiseDialog.vue";

    export default {
        components: {
            MyDriverChoise
        },
        data() {
            return {
                ruleForm: {
                    username: '',
                    nickname: '',
                    password: '',
                    sex: '',
                    permissionLevel: '',
                    //token: localStorage.getItem('company_token')
                },
                rules: {
                    username: [
                        {required: true, message: '请输入账户名'}
                    ],
                    password: [
                        {required: true, message: '请输入密码'}
                    ]
                    // resource: [
                    //     {required: true, message: '请选择'}
                    // ]
                },
                listLoading: false
                //:localStorage.getItem('company_token')

            };
        },
        created(){
            this.fetchData();
        },
        methods: {
            fetchData() {
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.listLoading = true;
                        addUser(this.ruleForm).then(response => {
                            this.listLoading = false;
                            this.$message({
                                type: 'success',
                                message: '添加成功!'
                            });
                            this.$router.push('../accountList');
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
            },
            // onSelectDriver(){
            //     this.$refs.myDriverChoise.show();
            // },
            // onSelectDriverSubmit(row){
            //     this.ruleForm.driver_name = row.fleetDriver.name;
            //     this.ruleForm.driver_phone = row.fleetDriver.phone;
            // },
            // day(val){
            //     if(val == null)
            //         return null;
            //     return parseTime(val,"{y}/{m}/{d}");
            // }
        },
        filters: {
            // day: function (value) {
            //     return parseTime(value,"{y}/{m}/{d}");
            // }
        }
    }
</script>
