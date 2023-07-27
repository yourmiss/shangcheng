<template>
    <div>
        <ParamsHead />
        <ParamsList />
        <ParamsAdd />
    </div>
</template>

<script>
import ParamsList from "./ParamsList";
import ParamsHead from "./ParamsHead";
import ParamsAdd from "./ParamsAdd"
export default {
    data() {
        return {};
    },
    components: {
        ParamsList,
        ParamsHead,
        ParamsAdd
    },
};
</script>

<style>
</style>