<template>
    <div>
        <h3>个人中心</h3>
        <el-button type="text" @click="dialogVisible = true">查看合同</el-button>
        <el-dialog
            title="合同样本"
            :visible.sync="dialogVisible"
            width="70%"
            :before-close="handleClose"
        >
            <div class="parent">
                <el-button @click="$refs.pdf.print()">打印</el-button>
                <pdf
                    ref="pdf"
                    :src="src"
                    :page="currentPage"
                    @progress="getProgress"
                    @page-loaded="currentPage=$event"
                    @loaded="loadPdfHandler"
                ></pdf>
            </div>
            <el-pagination
                background
                layout="prev, pager, next"
                :page-size="1"
                :total="numPages"
                @current-change="changePage"
            ></el-pagination>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
        <div id="line"></div>
    </div>
</template>

<script>
import pdf from "vue-pdf";
var loadingTask = pdf.createLoadingTask("./sxt.pdf");

export default {
    data() {
        return {
            dialogVisible: false,
            src: loadingTask,
            currentPage: 1,
            numPages: 1,
            echartData:{
                color:[],
                water:[]
            }
        };
    },
    components: {
        pdf,
    },
    mounted() {
        this.src.promise.then((pdf) => {
            this.numPages = pdf.numPages;
        });
        const color=['red', 'blue', 'pink']
        const water2015 = [200, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
        this.echartData.color = color;
        this.echartData.water = water2015
        this.$charts.line("line",this.echartData)
    },
    methods: {
        handleClose(done) {
            this.$confirm("确认关闭？")
                .then((_) => {
                    done();
                })
                .catch((_) => {});
        },
        changePage(page) {
            this.currentPage = page;
        },
        getProgress(e) {
            console.log("加载进度：", e);
        },
        loadPdfHandler() {
            console.log("PDF加载完成啦");
        }
    },
};
</script>

<style scoped>

#line{
    width: 400px;
    height: 400px;
}

</style>