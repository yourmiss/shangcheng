<template>
    <el-pagination class="pagination" layout="prev, pager, next, jumper" :total="total" @current-change="getPageHandle"></el-pagination>
</template>

<script>
export default {
    name:"Pagination",
    data(){
        return{
            total:0
        }
    },
    mounted(){
        this.$api.total().then(res =>{
            this.total = res.data.result[0]["count(*)"];
        })
        this.$bus.$on("onSearch",search =>{
            this.total = search.length;
        })
    },
    methods:{
        getPageHandle(page){
            this.$bus.$emit("onPage",page)
        }
    }
};
</script>

<style scoped lang="less">
.pagination{
    margin-top: 50px;
}
</style>