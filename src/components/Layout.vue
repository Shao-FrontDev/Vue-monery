<template>
  <div class="nav-wrapper">
    <header class="nav-wrapper__header">
      <div>记账本</div>
    </header>
    <div class="nav-wrapper__content">
      <slot></slot>
    </div>

    <Nav />
  </div>
</template>

<script>
import Nav from "./Nav.vue";
export default {
  components: {
    Nav
  }
};
</script>

<style lang="scss" scoped>
.nav-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  &__header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 7vh;
    padding: 15px 0;
    background-color: #f56040;
    color: white;
  }
  &__content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow: auto;
    background: #e5e5e5;
  }
}
</style>
