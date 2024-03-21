<template>
    <!-- 加载动画组件 -->
    <el-row v-loading.body="Loading" element-loading-text="请稍后...">
        
        <!-- 面包屑导航 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '../home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>个人中心</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 表单内容 -->
        <el-row style="margin-top: 50px">
            <el-form :model="userForm" :rules="rules" ref="userForm" label-width="150px" class="demo-ruleForm">

                <el-row>
                    <el-col :span="8">
                        <el-row>
                            <!-- 账户名输入框 -->
                            <el-form-item label="账户名">
                                <el-input v-model="userForm.username" :disabled="true"></el-input>
                            </el-form-item>
                        </el-row>
                        
                        <el-row>
                            <!-- 昵称输入框 -->
                            <el-form-item label="昵称">
                                <el-input v-model="userForm.nickname"></el-input>
                            </el-form-item>
                            <!-- 性别单选框 -->
                            <el-form-item label="性别" prop="sex">
                                <el-radio-group v-model="userForm.sex">
                                    <el-radio class="radio" label="男"></el-radio>
                                    <el-radio class="radio" label="女"></el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <!-- 公司名称输入框，注释部分 -->
                        </el-row>
                    </el-col>

                    <!-- 右侧内容，注释部分 -->
                </el-row>

                <!-- 按钮操作 -->
                <el-form-item>
                    <el-button type="primary" @click="submitForm('userForm')" icon="upload">更新账户</el-button>
                    <el-button type="warning" @click="showPasswordDialog" icon="edit">修改密码</el-button>
                </el-form-item>
            </el-form>
        </el-row>

        <!-- 修改密码对话框 -->
        <el-dialog title="重置密码" :visible.sync="dialogPasswordVisible">
            <el-form :model="passwordForm">
                <el-form-item label="旧密码">
                    <el-input type="password" v-model="passwordForm.oldPassword" style="width: 400px"></el-input>
                </el-form-item>
                <el-form-item label="新密码">
                    <el-input type="password" v-model="passwordForm.newPassword" style="width: 400px"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogPasswordVisible = false">取 消</el-button>
                <el-button type="primary" @click="password()">确 定</el-button>
            </div>
        </el-dialog>
    </el-row>
</template>

<script>
    // 引入接口和工具函数
    import { getInfo,updateInfo,updatePassword } from '@/api/user'
    import { parseTime } from '@/utils/time'

    export default {
        data() {
            return {
                Loading: false,
                LoadingParam:{
                    token: localStorage.getItem('token')
                },
                userForm: {
                    username: '',
                    nickname: '',
                    sex: '',
                },
                passwordForm:{
                    token: localStorage.getItem('token'),
                    oldPassword:'',
                    newPassword:'',
                },
                dialogPasswordVisible: false,
                rules: {
                    sex: [
                        {required: true, message: '请选择性别'}
                    ],
                    company: [
                        {required: true, message: '请输入公司名称'}
                    ]
                },
                imagePercente: 0,
            };
        },
        created() {
            this.loadForm();
        },
        methods: {
            loadForm(){
                this.Loading = true;
                // 获取用户信息
                getInfo(this.LoadingParam).then(response => {
                    this.userForm = response.data;
                    this.userForm.token = localStorage.getItem('token');
                    this.Loading = false;
                });

            },
            submitForm(formName) {
                // 表单验证与提交
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.listLoading = true;
                        updateInfo(this.userForm).then(response => {
                                this.listLoading = false;
                                this.$message({
                                    type: 'success',
                                    message: '修改成功!'
                                });
                            },
                            error =>{
                                this.listLoading = false;
                            });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            showPasswordDialog(){
                this.dialogPasswordVisible = true;
            },
            password(){
                // 密码验证和修改
                if (this.userForm.password !== this.passwordForm.oldPassword) {
                    this.$message({
                        type: 'error',
                        message: '旧密码不一致!'
                    });
                } else if (this.passwordForm.oldPassword == this.passwordForm.newPassword) {
                    this.$message({
                        type: 'error',
                        message: '新密码需与旧密码不同!'
                    });
                } else {
                    this.dialogPasswordVisible = false;
                    updatePassword(this.passwordForm).then(response => {
                        this.$message({
                            type: 'success',
                            message: '修改密码成功!'
                        });
                    });
                }
            },
        }
    }
</script>


<style>
    /* 头像上传样式 */
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        height: 200px;
        width: 200px;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100px;
        height: 100px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 200px;
        height: 200px;
        display: block;
    }
</style>
