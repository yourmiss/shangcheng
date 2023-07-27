<template>
    <div>
        <ProductHead />
        <ProjectList />
        <Pagination />
        <ProductAdd />
        <ProductPreUpdate />
    </div>
</template>

<script>
import ProductHead from "./ProductHead";
import ProjectList from "./ProjectList";
import Pagination from "./Pagination";
import ProductAdd from "./ProductAdd";
import ProductPreUpdate from "./ProductPreUpdate"
export default {
    components: {
        ProjectList,
        Pagination,
        ProductHead,
        ProductAdd,
        ProductPreUpdate
    }
};
</script>

<style>
</style>