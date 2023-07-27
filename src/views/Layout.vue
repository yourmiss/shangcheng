<template>
    <div class="home">
        <NavMenu />
        <div class="container">
          <router-view></router-view>
        </div>
    </div>
</template>

<script>
import NavMenu from "./NavMenu";

export default {
    name: "Home",
    components: {
        NavMenu,
    },
};
</script>
<style lang="less" scoped>

.container{
  width: 1400px;
  margin: 0 auto;
}

</style>
