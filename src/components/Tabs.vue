<template>
  <div>
    <ul class="tabs">
      <li
        :class="type === '-' && 'selected'"
        @click="selectType('-')"
        class="tabs__item"
      >
        支出
      </li>
      <li
        :class="type === '+' && 'selected'"
        @click="selectType('+')"
        class="tabs__item"
      >
        收入
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: { type: String },
  setup(props, ctx) {
    const selectType = type => {
      ctx.emit("update:changeType", type);
    };
    return { selectType };
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/helper.scss";
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

.selected {
  color: $color-hightlight;
}
</style>
