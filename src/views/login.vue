<template>
    <div class="login">
        <div class="form-container">
            <h2>旅发后台管理系统</h2>
            <el-form class="form" :model="loginForm" ref="loginForm" :rules="rules" label-width="120px" @keyup.enter.native="login('loginForm')">
                <el-form-item label="用户名：" prop="user">
                    <el-input prefix-icon="el-icon-user" :size="$size" placeholder="请输入用户名" v-model.trim="loginForm.user"></el-input>
                </el-form-item>
                <el-form-item label="密码：" prop="password">
                    <el-input prefix-icon="el-icon-unlock" :size="$size" placeholder="请输入密码" v-model.trim="loginForm.password"></el-input>
                </el-form-item>
                <div class="form-footer center">
                    <el-button :size="$size" @click="login('loginForm')">登&nbsp;&nbsp;录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            loginForm: {},
            rules: {
                user: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
                password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
            }
        }
    },
    created() {},
    methods: {
        login(formName) {
            this.$refs[formName].validate(v => {
                if(v) {
                    console.log('验证通过，继续操作');
                    this.$router.push("/test")
                }else{
                    return false;
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .login {
        height: 100%;
        .form-container {
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            right: 0;
            margin: auto auto;
            width: 500px;
            height: 400px;
            border-radius: 5px;
            border: 1px solid #25979A;
            h2 {
                background: #25979A;
                color: #fff;
                margin: 0;
                padding: 15px 0;
                text-align: center;
            }
            .form {
                padding: 50px 20px 20px;
                box-sizing: border-box;
                .form-footer {
                    margin-top: 50px;
                }
            }
        }
    }
</style>