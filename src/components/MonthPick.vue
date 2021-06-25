<template>
  <div class="grid-wrapper">
    <Button
      v-for="(month, index) in months"
      :key="month"
      @click="selected(index)"
      class="btn"
      >{{ month }} 月</Button
    >
  </div>
</template>

<script>
import dayjs from "dayjs";
import Button from "./Button.vue";
import { reactive } from "@vue/reactivity";
import { useStore } from "vuex";

export default {
  components: { Button },

  setup(props, ctx) {
    const months = reactive([
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
    ]);

    const selected = index => {
      const monthNumber = index + 1;
      const currentMonth = dayjs().format("YYYY-MM");
      let current;
      if (monthNumber >= 10) {
        current =
          currentMonth.substring(0, currentMonth.length - 2) + monthNumber;
      } else {
        current =
          currentMonth.substring(0, currentMonth.length - 1) + monthNumber;
      }
      ctx.emit("update:month", current);
    };

    return {
      months,
      selected
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
.btn {
  color: #333333;
}
</style>
