<template>
  <div class="home">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { nextTick, provide } from "@vue/runtime-core";
export default {
  setup() {
    const isRouterAlive = ref(true);
    const reload = () => {
      isRouterAlive.value = false;
      nextTick(() => {
        isRouterAlive.value = true;
      });
    };
    provide("reload", reload);

    return {
      isRouterAlive,
      reload
    };
  }
};
</script>

<style lang="scss">
@import "~@/assets/styles/normalize.scss";
@import "~@/assets/styles/reset.scss";
@import "~@/assets/styles/helper.scss";
body {
  background: white;
  font-family: $font-hei;
  height: 100vh;
  overflow: hidden;
}

.home {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
