<template>
  <div class="card">
    <div class="card__type">
      {{ item.selectedTags[0].content }}
    </div>
    <div class="card__consumed">
      {{ item.selectedType }}{{ item.selectedAmount }}
    </div>
    <div class="card__info">
      <div class="card__info__time">
        <span>记录时间</span>
        <span>{{ beautify(item.createAt) }}</span>
      </div>
      <div class="card__info__remark">
        <span>备注</span>
        <span>{{ item.selectedNotes }}</span>
      </div>
    </div>
    <div class="card__operation">
      <button class="card__operation__delete">删除</button>
      <button class="card__operation__edit">编辑</button>
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { useStore } from "vuex";
export default {
  setup(props) {
    const route = useRoute();
    const store = useStore();
    const id = route.params.id;
    const recordList = store.getters.recordList;
    let item = null;
    for (let i = 0; i < recordList.length; i++) {
      if (recordList[i].id === id) {
        item = recordList[i];
      }
    }
    const beautify = str => {
      const [prefix, other] = str.split("T");
      return prefix;
    };
    return {
      item,
      beautify
    };
  }
};
</script>

<style lang="scss" scoped>
.card {
  border-radius: 8px;
  background-color: #fff;
  padding: 0 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
