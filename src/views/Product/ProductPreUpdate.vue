<template>
    <el-dialog
        title="修改商品"
        :visible.sync="dialogUpdateVisible"
        width="80%"
        :before-close="handleClose"
    >
        <el-form label-width="70px" :label-position="labelPosition" :model="updateForm">
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
                        <el-button type="primary" @click="categoryInnerVisible = false">确 定</el-button>
                    </span>
                </el-dialog>
            </el-form-item>
            <el-form-item label="商品名称">
                <el-input v-model="updateForm.name"></el-input>
            </el-form-item>
            <el-form-item label="商品卖点">
                <el-input v-model="updateForm.sellPoint"></el-input>
            </el-form-item>
            <el-form-item label="商品价格">
                <el-input v-model="updateForm.price"></el-input>
            </el-form-item>
            <el-form-item label="商品数量">
                <el-input v-model="updateForm.num"></el-input>
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
                <ProjectWangEditor @onEditor="getEditor" :onEditorData="onEditorData"/>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogUpdateVisible = false">取 消</el-button>
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
            dialogUpdateVisible: false,
            categoryInnerVisible: false,
            uploadInnerVisible: false,
            labelPosition: "left",
            updateForm: {
                name: "",
                sellPoint: "",
                price: "",
                num: "",
            },
            categoryData: {},
            uploadData: {},
            editorData: "",
            id: "",
            onEditorData:""
        };
    },
    components: {
        ProductCategory,
        ProductUpload,
        ProjectUEditor,
        ProjectWangEditor,
    },
    mounted() {
        this.$bus.$on("updateFlag", (row) => {
            this.dialogUpdateVisible = true;
            this.id = row.id;
            this.updateForm = {
                name: row.title,
                sellPoint: row.sellPoint,
                price: row.price,
                num: row.num,
            };
            this.categoryHttp(row.cid);
            this.uploadData = {
                url: row.image,
            };
            // todo
            this.onEditorData = row.descs
        });
    },
    methods: {
        categoryHttp(cid) {
            this.$api
                .preCategory({
                    cid: cid,
                })
                .then((res) => {
                    if (res.data.status === 200) {
                        this.categoryData = {
                            name: res.data.result[0].name,
                            cid: res.data.result[0].cid,
                        };
                    }else{
                        console.log("失败");
                    }
                });
        },
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
         * 修改商品提交
         */
        sureSubmit() {
            this.$api.updateProject({
                    id: this.id,
                    title: this.updateForm.name,
                    sellPoint: this.updateForm.sellPoint,
                    price: this.updateForm.price,
                    num: this.updateForm.num,
                    desc: this.editorData,
                    image: this.uploadData.url,
                })
                .then((res) => {
                    if (res.data.status === 200) {
                        this.dialogUpdateVisible = false;
                        this.$bus.$emit("onAddSuccess");
                    } else {
                        this.$message({
                            type: "error",
                            message: "修改失败",
                        });
                    }
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