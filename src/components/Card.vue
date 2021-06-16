<template>
  <div class="card">
    <header class="card__header">
      <h3 class="">{{ toBeautify(card?.title) }}</h3>
      <div>
        <span class="card?__header__element">出：{{ card?.outcome }}</span>
        <span>入：{{ card?.input }}</span>
      </div>
    </header>
    <ol>
      <li
        v-for="item in card?.items"
        :key="item.id"
        class="card__record"
        @click="showDetail(item)"
      >
        <span>
          {{ item.selectedTags[0].content }}
        </span>
        <span> {{ item.selectedType }}{{ item.selectedAmount }} </span>
      </li>
    </ol>
  </div>
</template>

<script>
import { beautify } from "@/utility/tool";
export default {
  name: "Card",
  props: {
    card: Object,
    required: () => {
      return true;
    },
    default: () => {
      return {};
    }
  },
  methods: {
    toBeautify(value) {
      return beautify(value);
    },
    showDetail(item) {
      console.log(item);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/constants.scss";

.card {
  display: block;
  margin: 10px;
  border-radius: 16px;
  &__header {
    display: flex;
    justify-content: space-between;
    height: 50px;
    line-height: 50px;
    padding: 0 16px;
    background-color: $card-title-color;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    &__element {
      margin-right: 10px;
    }
  }
  &__record {
    cursor: pointer;
    padding: 10px 16px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgb(196, 196, 196);
  }
}
</style>
