<template>
  <div class="wrapper">
    <div v-if="$slots">
      <slot></slot>
    </div>
    <ul class="wrapper__types">
      <li
        :class="type === '-' && 'wrapper__types__link--selected'"
        @click="selectType('-')"
        class="wrapper__types__link"
      >
        支出
      </li>
      <li
        :class="type === '+' && 'wrapper__types__link--selected'"
        @click="selectType('+')"
        class="wrapper__types__link"
      >
        收入
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup(props, ctx) {
    const type = ref("+");
    const selectType = TYPE => {
      if (TYPE !== "-" && TYPE !== "+") {
        throw new Error("type is unknown");
      }
      type.value = TYPE;
      ctx.emit("update:selectedType", type.value);
    };

    return {
      type,
      selectType
    };
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/helper.scss";

.wrapper {
  background: #e7e7e7;
  position: relative;
  &__button {
    position: absolute;
    top: 5px;
    left: 5px;
    cursor: pointer;
    border: none;
    background: #d94c1a;
    border-radius: 16px;
    color: white;
    height: 50px;
    width: 100px;
  }
  &__types {
    display: flex;
    height: 64px;
    line-height: 64px;
    justify-content: center;
    .selected {
      color: cornflowerblue;
    }
    &__link {
      cursor: pointer;
      text-align: center;
      width: 15%;
      &--selected {
        color: $color-hightlight;
      }
    }
  }
}
</style>
