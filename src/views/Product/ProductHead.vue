<template>
    <div class="head">
        <el-form ref="searchForm" :model="search" @submit.native.prevent>
            <el-form-item>
                <el-input v-model="search.content" @keyup.enter.native="onSubmitSearch"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmitSearch">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmitAdd">添加</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: "Head",
    data() {
        return {
            search: {
                content: "",
            },
        };
    },
    methods: {
        onSubmitSearch(e) {
            if(e.keyCode === 13){
                e.preventDefault();
            }
            if (this.search.content !== "") {
                this.$api.search({
                    search: this.search.content,
                }).then(res =>{
                    if(res.data.status === 200){
                        this.$bus.$emit("onSearch",res.data.result)
                    }
                })
            }
        },
        onSubmitAdd() {
            this.$bus.$emit("productAddVisible", true);
        },
    },
};
</script>

<style scoped lang="less">
.el-form {
    overflow: hidden;
    clear: both;
    .el-form-item {
        float: left;
        margin-right: 10px;
        .el-input {
            width: 1230px;
        }
    }
}

.head {
    margin-top: 20px;
    width: 100%;
}
</style>