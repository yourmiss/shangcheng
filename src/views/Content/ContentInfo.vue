<template>
    <div>
        <el-button @click="contentInfoAdd" v-if="contentData.name">添加{{ contentData.name }}</el-button>
        <el-table :data="contentInfo" style="width: 100%">
            <el-table-column show-overflow-tooltip prop="pid" label="PID" width="180"></el-table-column>
            <el-table-column show-overflow-tooltip prop="name" label="名称" width="180"></el-table-column>
            <el-table-column show-overflow-tooltip prop="url" label="访问地址"></el-table-column>
            <el-table-column show-overflow-tooltip prop="image" label="图片地址"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)"
                    >删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
            title="添加数据"
            :visible.sync="dialogInfoVisible"
            width="30%"
            :before-close="handleClose"
        >
            <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px">
                <el-form-item label="名称" prop="name">
                    <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="访问地址" prop="url">
                    <el-input type="text" v-model="ruleForm.url" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="图片地址" prop="image">
                    <el-input type="text" v-model="ruleForm.image" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogInfoVisible = false">取 消</el-button>
                <el-button type="primary" @click="contentInfoAddHandle">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
    data() {
        return {
            dialogInfoVisible: false,
            ruleForm: {
                name: "",
                url: "",
                image: "",
            },
        };
    },
    computed: {
        ...mapState("contentInfoModule", ["contentInfo", "contentData"]),
    },
    methods: {
        ...mapActions("contentInfoModule", ["asyncSetContentInfo"]),
        contentInfoAdd() {
            this.dialogInfoVisible = true;
        },
        contentInfoAddHandle() {
            this.$api
                .contentInfoAdd({
                    pid: this.contentData.pid,
                    name: this.ruleForm.name,
                    url: this.ruleForm.url,
                    image: this.ruleForm.image,
                })
                .then((res) => {
                    if (res.data.status === 200) {
                        this.dialogInfoVisible = false;
                        this.asyncSetContentInfo(this.contentData);
                    } else {
                        console.log("失败了");
                    }
                });
        },
        handleClose() {
            this.dialogInfoVisible = false;
        },
        handleDelete(index, row) {
            this.$api
                .contentInfoDel({
                    id: row.id,
                })
                .then((res) => {
                    this.asyncSetContentInfo(this.contentData);
                });
        },
    },
};
</script>

<style>
</style>