<template>
    <el-dialog
        title="添加规格参数"
        :visible.sync="dialogParamsAddVisible"
        width="60%"
        :before-close="handleClose"
    >
        <ParamsCategory @onParamsCategory="getParamsCategory" />
        <el-dialog width="50%" title="规格参数" :visible.sync="innerParamsAddVisible" append-to-body>
            <el-button @click="addDomain">添加分组</el-button>
            <el-form :model="dynamicValidateForm" ref="dynamicValidateForm">
                <el-form-item
                    v-for="(item,index) in dynamicValidateForm.domains"
                    :key="index"
                    label="规格参数"
                >
                    <el-input v-model="item.value" style="width:80%"></el-input>
                    <el-button @click="addParams(index)">添加参数</el-button>
                    <el-button @click="removeDomain(item)">删除分组</el-button>
                    <div v-for="(childItem,childIndex) in item.children" :key="childIndex">
                        <el-input v-model="childItem.childValue" style="width:60%;margin-left:80px"></el-input>
                        <el-button @click="removeChild(index,childItem)">删除参数</el-button>
                    </div>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="innerParamsAddVisible = false">取 消</el-button>
                <el-button type="primary" @click="paramsSubimt">提 交</el-button>
            </span>
        </el-dialog>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogParamsAddVisible = false">取 消</el-button>
            <el-button :disabled="disabled" type="primary" @click="paramsContentHandle">确定并添加分组内容</el-button>
        </span>
    </el-dialog>
</template>

<script>
import ParamsCategory from "./ParamsCategory";
export default {
    data() {
        return {
            dialogParamsAddVisible: false,
            innerParamsAddVisible: false,
            disabled: true,
            categoryData: {},
            dynamicValidateForm: {
                domains: [
                    {
                        value: "",
                        children: [
                            {
                                childValue: "",
                                value: "",
                            },
                            {
                                childValue: "",
                                value: "",
                            },
                        ],
                    },
                ],
            },
        };
    },
    mounted() {
        this.$bus.$on("onParamsAdd", () => {
            this.dialogParamsAddVisible = true;
        });
    },
    components: {
        ParamsCategory,
    },
    methods: {
        getParamsCategory(category) {
            this.disabled = false;
            this.categoryData = category;
        },
        paramsContentHandle() {
            this.innerParamsAddVisible = true;
        },
        handleClose() {
            dialogParamsAddVisible = false;
        },
        /**
         * 添加规格大分类
         */
        addDomain() {
            this.dynamicValidateForm.domains.push({
                value: "",
                children: [
                    {
                        childValue: "",
                        value: "",
                    },
                    {
                        childValue: "",
                        value: "",
                    },
                ],
            });
        },

        /**
         * 删除规格参数大分类
         */
        removeDomain(item) {
            /**
             * React移除， split
             */
            var index = this.dynamicValidateForm.domains.indexOf(item);
            this.dynamicValidateForm.domains.splice(index, 1); // start count
        },
        /**
         * 添加规格小分类
         */
        addParams(index) {
            this.dynamicValidateForm.domains[index].children.push({
                childValue: "",
                value: "",
            });
        },
        /**
         * 删除规格参数小分类
         */
        removeChild(index, childItem) {
            var num = this.dynamicValidateForm.domains[index].children.indexOf(
                childItem
            );
            this.dynamicValidateForm.domains[index].children.splice(num, 1); // start count
        },
        /**
         * 用户添加提示
         */
        openMessage(msg) {
            const h = this.$createElement;
            this.$notify({
                title: "添加提示",
                message: h(
                    "i",
                    { style: "color: teal" },
                    msg
                ),
            });
        },
        /**
         * 提交事件
         */
        paramsSubimt() {
            // 对象类型数据不可以直接传递，以前我们都是字符串
            this.$api.paramsAdd({
                    itemCatId: this.categoryData.cid,
                    content: JSON.stringify(this.dynamicValidateForm.domains)
                })
                .then((res) => {
                    if (res.data.status === 200) {
                        this.dialogParamsAddVisible = false;
                        this.innerParamsAddVisible = false;
                    }
                    this.openMessage(res.data.msg);
                    this.$bus.$emit("addOnFresh")
                });
        },
    },
};
</script>

<style>
</style>