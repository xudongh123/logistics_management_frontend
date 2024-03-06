<template>
    <div class="login-wrap" >
        <div class="ms-title">
            <span class="blue-text">物流</span>
            <span class="white-text">管理系统</span>
        </div>
        <div class="ms-login"  v-loading.body="listLoading" element-loading-text="正在登录中">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="px" class="demo-ruleForm" style="margin-top: 30px">
                <el-form-item prop="username">
                    <el-input class="custom-input" v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="请输入密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    import { login } from '@/api/user';

    export default {
        data: function(){
            return {
                type:'company',
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                },
                listLoading: false,
                dialogFormVisible: false,
                msgButton:'',
                msgCount:0,
                msgVisible:false,
                mInterval:null,
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.listLoading = true;
                        login(this.ruleForm).then(response => {
                                    this.listLoading = false;
                                    this.$message({
                                        type: 'success',
                                        message: '登录成功!'
                                    });
                                    localStorage.setItem('username', this.ruleForm.username);
                                    localStorage.setItem('companyToken', response.data.token);
                                    localStorage.setItem('type', 'company');
                                    this.$router.push('/company/home');
                                },
                                error => {
                                    this.listLoading = false;
                                });
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top:70%;
        left:15%;
        width:100%;
        margin-top: -250px;
        text-align: center;
        font-size: 85px;
        color: #e3e8e8;
        font-weight: bold;

    }
    .ms-login{
        position: absolute;
        left:30%;
        top:50%;
        width:300px;
        height:230px;
        margin:-150px 0 0 -190px;
        padding:40px;
        background: rgba(174, 176, 178, 0.5); /* 半透明的白色 */
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
    .blue-text {
        color: #6c9ac8;
    }
    .white-text {
        color: white;
    }

</style>
