<template>
    <el-tree
        highlight-current
        :props="defaultProps"
        :load="loadNode"
        lazy
        @node-click="handleNodeClick"
    ></el-tree>
</template>

<script>
export default {
    data() {
        return {
            defaultProps: {
                children: "children",
                label: "name",
            },
        };
    },
    methods: {
        loadNode(node, resolve) {
            if (node.level === 0) {
                this.$api.category().then((res) => {
                    if (res.data.status === 200) {
                        return resolve(res.data.result);
                    } else {
                        return resolve([]);
                    }
                });
            }
            if (node.level >= 1) {
                this.$api.category({
                        id: node.data.cid,
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
            this.$emit("categoryEvent",data)
        },
    },
};
</script>

<style>
</style>