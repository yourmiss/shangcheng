<template>
    <div>
        <el-tree
            highlight-current
            :props="defaultProps"
            :load="loadNode"
            lazy
            @node-click="handleNodeClick"
            :expand-on-click-node="false"
            :render-content="renderContent"
        ></el-tree>
        <el-dialog
            title="添加子导航"
            :visible.sync="dialogContentAddVisible"
            width="30%"
            :before-close="handleClose"
        >
            <el-input type="text" v-model="addContent"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogContentAddVisible = false">取 消</el-button>
                <el-button type="primary" @click="sureContentAddHandle">确 定</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="修改导航"
            :visible.sync="dialogContentUpdateVisible"
            width="30%"
            :before-close="handleClose"
        >
            <el-input type="text" v-model="updateContent"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogContentUpdateVisible = false">取 消</el-button>
                <el-button type="primary" @click="sureContentUpdateHandle">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>

import { mapActions } from "vuex"

export default {
    name: "ContentNav",
    inject:["reload"],
    data() {
        return {
            addContent: "",
            updateContent: "",
            dialogContentAddVisible: false,
            dialogContentUpdateVisible: false,
            defaultProps: {
                children: "children",
                label: "name",
            },
            ContentData: {},
        };
    },
    methods: {
        ...mapActions("contentInfoModule",["asyncSetContentInfo"]),
        loadNode(node, resolve) {
            if (node.level === 0) {
                this.$api.contentList().then((res) => {
                    if (res.data.status === 200) {
                        return resolve(res.data.result);
                    } else {
                        return resolve([]);
                    }
                });
            }
            if (node.level >= 1) {
                this.$api
                    .contentList({
                        id: node.data.pid,
                    })
                    .then((res) => {
                        if (res.data.status === 200) {
                            return resolve(res.data.result);
                        } else {
                            return resolve([]);
                        }
                    })
                    .catch((error) => {
                        resolve([]);
                    });
            }
        },
        handleNodeClick(data) {
            console.log(data);
            this.asyncSetContentInfo(data)
        },
        renderContent(h, { node, data, store }) {
            return (
                <span class="custom-tree-node">
                    <span>{node.label}</span>
                    <span>
                        <el-button
                            size="mini"
                            type="text"
                            on-click={() => this.append(node, data)}
                        >
                            增加子导航
                        </el-button>
                        <el-button
                            size="mini"
                            type="text"
                            on-click={() => this.update(node, data)}
                        >
                            修改
                        </el-button>
                        <el-button
                            size="mini"
                            type="text"
                            on-click={() => this.remove(node, data)}
                        >
                            删除
                        </el-button>
                    </span>
                </span>
            );
        },
        append(node, data) {
            this.ContentData = data;
            this.dialogContentAddVisible = true;
        },
        update(node, data) {
            this.ContentData = data;
            this.dialogContentUpdateVisible = true;
        },
        remove(node, data) {
            this.$api
                .contentDel({
                    pid: data.pid,
                })
                .then((res) => {
                    if (res.data.status === 200) {
                        this.reload();
                        console.log(res.data.msg);
                    } else {
                        console.log(res.data.msg);
                    }
                });
        },
        sureContentAddHandle() {
            this.$api
                .contentAdd({
                    name: this.addContent,
                    pid: this.ContentData.pid,
                })
                .then((res) => {
                    if (res.data.status === 200) {
                        console.log(res.data.msg);
                        this.reload();
                    } else {
                        console.log(res.data.msg);
                    }
                });
        },
        sureContentUpdateHandle() {
            this.$api
                .contentUpdate({
                    name: this.updateContent,
                    pid: this.ContentData.pid,
                })
                .then((res) => {
                    if (res.data.status === 200) {
                        console.log(res.data.msg);
                        this.reload();
                    } else {
                        console.log(res.data.msg);
                    }
                });
        },
        handleClose() {
            this.dialogContentAddVisible = false;
        },
    },
};
</script>

<style>
</style>