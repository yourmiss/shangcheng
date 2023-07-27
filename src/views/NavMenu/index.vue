<template>
    <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
    >
        <el-menu-item index="/"><i class="el-icon-menu"></i>{{ $t("message.project") }}</el-menu-item>
        <el-menu-item index="/params"><i class="el-icon-document"></i>{{ $t("message.params") }}</el-menu-item>
        <el-menu-item index="/content"><i class="el-icon-setting"></i>{{ $t("message.content") }}</el-menu-item>
        <div class="user">
            <router-link to="/user" tag="span" class="user-name">{{ user.username }}</router-link>
            <el-button class="logout" @click="logoutHandle">退出</el-button>
        </div>
        <el-menu-item class="set-lang">
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    语言环境
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="zh">中文</el-dropdown-item>
                    <el-dropdown-item command="en">英文</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-menu-item>
    </el-menu>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import local from "../../utils/lcoalUtils";
import i18n from "../../plugins/i18n"

export default {
    name: "NavMenu",
    data() {
        return {
            activeIndex: "/",
        };
    },
    computed: {
        ...mapState("loginModule", ["user"]),
    },
    mounted() {
        if (sessionStorage.getItem("path")) {
            this.activeIndex = sessionStorage.getItem("path");
        }
    },
    methods: {
        ...mapMutations("loginModule", ["removeUser"]),
        handleSelect(key, keyPath) {
            if(key){
                sessionStorage.setItem("path", key);
            }
        },
        logoutHandle() {
            /**
             * 本地清除
             * 状态清除
             * 回到登录页
             */
            local.removeLocal("ego");
            this.removeUser();
            this.$router.push("/login");
        },
        /**
         * 切换语言环境
         */
        handleCommand(command){
            i18n.locale = command
        }
    },
};
</script>

<style scoped lang="less">
.user {
    float: right;
    margin-right: 20px;
    line-height: 60px;
    .user-name {
        color: #fff;
        margin-right: 10px;
        font-size: 15px;
        border: 1px solid #fff;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: inline-block;
        line-height: 40px;
    }
    .logout {
    }
}

.set-lang {
    float: right !important;
}

.el-dropdown-link {
    color: #fff;
}
</style>