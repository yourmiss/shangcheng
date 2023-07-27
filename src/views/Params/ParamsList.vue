<template>
    <div>
        <el-table :data="paramsData">
            <el-table-column prop="id" label="规格参数ID" width="100"></el-table-column>
            <el-table-column prop="itemCatId" label="类目ID" width="100"></el-table-column>
            <el-table-column show-overflow-tooltip prop="paramData" label="规格参数"></el-table-column>
            <el-table-column label="操作" width="80">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)"
                    >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: "ParamsList",
    data() {
        return {
            paramsData: [],
            page: 1,
        };
    },
    mounted() {
        this.$bus.$on("onParamsSearch", (result) => {
            this.paramsData = result;
        });
        this.$bus.$on("onParamsClear", (result) => {
            this.http(this.page);
        });
        this.$bus.$on("addOnFresh", () => {
            this.http(this.page);
        });
    },
    created() {
        this.http(this.page);
    },
    methods: {
        http(page) {
            this.$api
                .paramsList({
                    page: page,
                })
                .then((res) => {
                    if (res.data.status === 200) {
                        this.paramsData = res.data.result;
                    }
                });
        },
        handleDelete(index, row) {
            this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    this.$api.paramsDel({
                            id: row.id,
                        })
                        .then((res) => {
                            if (res.data.status === 200) {
                                this.$message({
                                    type: "success",
                                    message: "删除成功!",
                                });
                                this.http(this.page);
                            } else {
                                this.$message({
                                    type: "error",
                                    message: "删除失败",
                                });
                            }
                        });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });
                });
        },
    },
};
</script>

<style>
</style>