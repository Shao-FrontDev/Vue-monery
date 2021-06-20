<template>
  <div>
    <ul class="tabs">
      <li v-for="(item, index) in dataSource" :key="index" class="tabs__item">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dataSource: ["当月支出", "当月收入"]
    };
  }
};
</script>

<style lang="scss" scoped>
.tabs {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  &__item {
    margin: 10px;
    background: #fff;
    border-radius: 16px;
    cursor: pointer;
    padding: 10px 20px;
    text-align: center;
  }
}
</style>
