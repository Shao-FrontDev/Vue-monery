<template>
  <div class="tags">
    <ul class="tags__links">
      <li
        v-for="tag in data"
        :key="tag.id"
        @click="toggle(tag)"
        :class="{ selected: selectedTags.indexOf(tag) >= 0 }"
        class="tags__links__link"
      >
        {{ tag.content }}
      </li>
    </ul>
    <div class="tags__create-button">
      <button @click="create">
        新增标签
      </button>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
export default {
  name: "Tags",
  props: {
    dataSource: {
      type: Array,
      required: true
    }
  },
  // data() {
  //   return {
  //     selectedTags: []
  //   };
  // },
  // methods: {
  //   toggle(tag) {
  //     const index = this.selectedTags.indexOf(tag);
  //     if (index >= 0) {
  //       this.selectedTags.splice(index, 1);
  //     } else {
  //       this.selectedTags = [];
  //       this.selectedTags.push(tag);
  //     }
  //     this.$emit("update:selectedTags", this.selectedTags);
  //   },
  //   create() {
  //     const name = window.prompt("请输入标签名");
  //     this.$emit("update:dataSource", name);
  //   }
  // }
  setup(props, context) {
    const selectedTags = reactive([]);

    const data = reactive(props.dataSource);
    const toggle = tag => {
      const index = selectedTags.indexOf(tag);
      if (index >= 0) {
        selectedTags.splice(index, 1);
      } else {
        selectedTags.length = 0;
        selectedTags.push(tag);
      }

      context.emit("update:selectedTags", selectedTags);
    };

    const create = () => {
      const name = window.prompt("请输入标签名");
      context.emit("update:dataSource", name);
    };

    return { selectedTags, toggle, create, data };
  }
};
</script>

<style lang="scss" scoped>
.tags {
  font-size: 14px;
  padding: 16px;
  flex: 1;
  background: #fff;
  &__links {
    display: flex;
    flex-wrap: wrap;
    &__link {
      background: #d9d9d9;
      $h: 24px;
      height: $h;
      line-height: $h;
      border-radius: ($h/2);
      padding: 0 8px;
      margin-right: 12px;
      margin-bottom: 12px;
      transition: all 0.5s ease;
      &.selected {
        background: #c13584;
        color: white;
      }
    }
  }
  &__create-button {
    padding-top: 16px;
    button {
      cursor: pointer;
      background: transparent;
      border: none;
      color: #999;
      border-bottom: 1px solid;
      padding: 0 4px;
    }
  }
}

.icon {
  width: 25px;
  height: 25px;
  color: rgb(161, 48, 7);
}
</style>
