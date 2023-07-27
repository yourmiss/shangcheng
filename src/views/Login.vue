<template>
    <div class="login">
        <el-tabs
            v-model="activeName"
            type="border-card"
            class="login-tabs"
            stretch
            @tab-click="handleClick"
        >
            <el-tab-pane label="用户登陆" name="login" class="login-tabs-tab">
                <el-form
                    ref="loginForm"
                    :model="user"
                    status-icon
                    :rules="rules"
                    class="login-form"
                >
                    <el-form-item label="用户名" prop="username">
                        <el-input type="text" v-model="user.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="user.password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('loginForm')">登陆</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="用户注册" name="register">
                <el-form
                    ref="registerForm"
                    :model="user"
                    status-icon
                    :rules="rules"
                    class="login-form"
                >
                    <el-form-item label="用户名" prop="username">
                        <el-input type="text" v-model="user.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="user.password"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="surePassword">
                        <el-input type="password" v-model="user.surePassword"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input type="email" v-model="user.email"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('registerForm')">注册</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>

import { mapActions } from "vuex"

export default {
    name: "Login",
    data() {
        var validateUsername = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入用户名"));
            }
            callback();
        };

        var validatePassword = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入密码"));
            }
            callback();
        };

        var validateSurePassword = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入密码"));
            }
            callback();
        };

        var validateEmail = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入邮箱"));
            }
            callback();
        };

        return {
            user: {
                username: "",
                password: "",
                surePassword: "",
                email:""
            },
            rules: {
                username: [{ validator: validateUsername, trigger: "blur" }],
                password: [{ validator: validatePassword, trigger: "blur" }],
                email: [{ validator: validateEmail, trigger: "blur" }],
                surePassword: [
                    { validator: validateSurePassword, trigger: "blur" },
                ],
            },
            activeName: "login",
        };
    },
    methods: {
        ...mapActions("loginModule",["setUserActions"]),
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    /**
                     * 区分是登陆还是注册
                     */
                    if (this.activeName === "login") {
                        /**
                         * 登陆
                         */
                        this.setUserActions(this.user)
                        
                    }
                    if (this.activeName === "register") {
                        /**
                         * 注册
                         */
                        this.$api.register({
                            username:this.user.username,
                            password:this.user.password,
                            email:this.user.email
                        }).then(res =>{
                            console.log(res.data)
                        })
                    }
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        handleClick(tab, event) {},
    },
};
</script>

<style scoped lang="less">
.login {
    width: 500px;
    margin: 0 auto;
    margin-top: 100px;
    .login-form {
        padding: 40px 40px;
    }
    h3 {
        margin-top: 20px;
    }
    .login-tabs {
        border-radius: 5px;
    }
}
</style>