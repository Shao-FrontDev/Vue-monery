<template>
  <button class="button" :style="styleObj"><slot></slot></button>
</template>

<script>
export default {
  props: {
    color: String,
    default: () => {
      return "#333333";
    }
  },
  computed: {
    styleObj() {
      return {
        backgroundColor: this.color
      };
    }
  }
};
</script>

<style lang="scss" scoped>
button {
  cursor: pointer;
  border: none;
  border-radius: 16px;
  color: #333333;
  background: #ffffff;
  height: 50px;
  width: 100px;
}
</style>
