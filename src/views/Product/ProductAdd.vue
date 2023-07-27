<template>
    <el-dialog
        title="添加商品"
        :visible.sync="dialogAddVisible"
        width="80%"
        :before-close="handleClose"
    >
        <el-form label-width="70px" :label-position="labelPosition" :model="addForm" ref="ruleForm">
            <el-form-item label="类目选择">
                <el-button @click="categoryInnerVisible = true" class="category" type="primary">类目选择</el-button>
                <span class="category">{{ categoryData.name }}</span>
                <el-dialog
                    width="50%"
                    title="类目选择"
                    :visible.sync="categoryInnerVisible"
                    append-to-body
                >
                    <ProductCategory @categoryEvent="getCategroy" />
                    <span slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="getCategoryDataHandle">确 定</el-button>
                    </span>
                </el-dialog>
            </el-form-item>
            <el-form-item label="商品名称" prop="name">
                <el-input v-model="addForm.name"></el-input>
            </el-form-item>
            <el-form-item label="商品卖点" prop="sellPoint">
                <el-input v-model="addForm.sellPoint"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="price">
                <el-input v-model="addForm.price"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="num">
                <el-input v-model="addForm.num"></el-input>
            </el-form-item>
            <el-form-item label="商品图片">
                <el-button @click="uploadInnerVisible = true" class="category" type="primary">图片上传</el-button>
                <img class="upload-img" :src="uploadData.url" alt />
                <el-dialog
                    width="50%"
                    title="图片上传"
                    :visible.sync="uploadInnerVisible"
                    append-to-body
                >
                    <ProductUpload @onUpload="getUpload" />
                    <span slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="uploadInnerVisible = false">确 定</el-button>
                    </span>
                </el-dialog>
            </el-form-item>
            <el-form-item label="商品描述">
                <!-- <ProjectUEditor /> -->
                <ProjectWangEditor @onEditor="getEditor" />
            </el-form-item>
            <!-- 类目选择结构视图 -->
            <div v-for="(item,index) in categoryAddData" :key="index">
                <h3>{{ item.value }}</h3>
                <div v-for="(childItem,childIndex) in item.children" :key="childIndex">
                    <el-form-item label-width="130px" :label="childItem.childValue">
                        <el-input v-model="childItem.value" type="text"></el-input>
                    </el-form-item>
                </div>
            </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogAddVisible = false">取 消</el-button>
            <el-button type="primary" @click="sureSubmit">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import ProductCategory from "./ProductCategory";
import ProductUpload from "./ProductUpload";
import ProjectUEditor from "./ProdutUEditor";
import ProjectWangEditor from "./ProductWangeditor";

export default {
    data() {
        return {
            dialogAddVisible: false,
            categoryInnerVisible: false,
            uploadInnerVisible: false,
            categoryAddData: [],
            labelPosition: "left",
            addForm: {
                name: "",
                sellPoint: "",
                price: "",
                num: "",
            },
            categoryData: {},
            uploadData: {},
            editorData: "",
        };
    },
    props: {
        flag: {
            type: Boolean,
            default: false,
        },
    },
    components: {
        ProductCategory,
        ProductUpload,
        ProjectUEditor,
        ProjectWangEditor,
    },
    mounted() {
        this.$bus.$on("productAddVisible", (flag) => {
            this.dialogAddVisible = flag;
        });
    },
    methods: {
        handleClose(done) {
            this.$confirm("确认关闭？")
                .then((_) => {
                    done();
                })
                .catch((_) => {});
        },
        /**
         * 获取类目数据
         */
        getCategroy(data) {
            this.categoryData = data;
        },
        /**
         * 图片资源
         */
        getUpload(data) {
            var url = "http://localhost:3005" + data.url.replace("upload", "");
            this.uploadData = {
                url,
                name: data.name,
            };
        },
        /**
         * 获取富文本编辑器数据
         */
        getEditor(data) {
            this.editorData = data;
        },
        /**
         * 表单提交后清空表单
         */
        clearForm(){
            this.$refs["ruleForm"].resetFields();
            this.categoryData = {};
            this.uploadData = {};
            this.editorData = "";
        },
        /**
         * 添加商品提交
         */
        sureSubmit() {
            this.$api
                .productAdd({
                    title: this.addForm.name,
                    cid: this.categoryData.cid,
                    sellPoint: this.addForm.sellPoint,
                    price: this.addForm.price,
                    num: this.addForm.num,
                    desc: this.editorData,
                    image: this.uploadData.url,
                })
                .then((res) => {
                    if (res.data.status === 200) {
                        this.clearForm();
                        this.dialogAddVisible = false;
                        this.$bus.$emit("onAddSuccess");
                    }
                });
            // 提交规格参数的数据 todo
            this.$api.updateCategory({
                    cid: this.categoryData.cid,
                    content: JSON.stringify(this.categoryAddData),
                })
                .then((res) => {
                    if (res.data.status === 200) {
                        console.log(res.data.msg);
                    } else {
                        console.log(res.data.msg);
                    }
                });
        },
        /**
         *  类目结构数据获取
         */
        getCategoryDataHandle() {
            this.categoryInnerVisible = false;
            this.$api.categoryData({
                    cid: this.categoryData.cid,
                })
                .then((res) => {
                    this.categoryAddData = JSON.parse(
                        res.data.result[0].paramData
                    );
                });
        },
    },
};
</script>

<style scoped lang="less">
.category {
    float: left;
    margin-right: 20px;
}
.upload-img {
    width: 400px;
    float: left;
}
</style>