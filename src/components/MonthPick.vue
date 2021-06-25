<template>
  <div class="grid-wrapper">
    <Button v-for="month in months" :key="month">{{ month }} 月</Button>
  </div>
</template>

<script>
import Button from "./Button.vue";

export default {
  components: { Button },
  data() {
    return {
      months: [
        "一",
        "二",
        "三",
        "四",
        "五",
        "六",
        "七",
        "八",
        "九",
        "十",
        "十一",
        "十二"
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.grid-wrapper {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-template-rows: repeat(3, auto);
  justify-items: center;
  align-items: center;
}
</style>
