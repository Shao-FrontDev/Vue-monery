<template>
  <div class="card">
    <div class="card__type">
      {{ item.selectedTags[0].content }}
    </div>
    <div class="card__consumed">
      <h3>{{ item.selectedType }}{{ item.selectedAmount }}</h3>
    </div>
    <div class="card__info">
      <div class="card__info__time">
        <span class="grey">记录时间</span>
        <span>{{ beautify(item.createAt) }}</span>
      </div>
      <div class="card__info__remark">
        <span class="grey">备注</span>
        <span>{{ item.selectedNotes }}</span>
      </div>
    </div>
    <div class="card__operation">
      <button class="card__operation__delete red" @click="deleteRecord(id)">
        删除
      </button>
    </div>
  </div>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  setup() {
    const route = useRoute();
    const store = useStore();
    const router = useRouter();
    const id = route.params.id;
    const recordList = store.getters.recordList;
    let item = null;
    for (let i = 0; i < recordList.length; i++) {
      if (recordList[i].id === id) {
        item = recordList[i];
      }
    }
    console.log(recordList);
    const beautify = str => {
      const [prefix, other] = str.split("T");
      const [timeStamp, last] = other.split(".");
      const result = `${prefix} ${timeStamp}`;
      return result;
    };
    const deleteRecord = id => {
      store.commit("deleteRecord", id);
      router.push({ name: "Statistics" });
    };
    return {
      item,
      beautify,
      deleteRecord,
      id
    };
  }
};
</script>

<style lang="scss" scoped>
.card {
  border-radius: 16px;
  background-color: #fff;
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  &__type {
    margin: 10px 0;
  }
  &__info {
    width: 100%;
    display: flex;
    flex-direction: column;
    .grey {
      color: gray;
      margin-right: 16px;
    }
    &__time {
      width: 100%;
      display: flex;

      span {
        display: block;
      }
    }
    &__remark {
      display: block;
    }
  }
  &__operation {
    display: flex;
    justify-content: space-between;
    width: 100%;
    button {
      cursor: pointer;
      width: 100%;
      outline: none;
      border: none;
      background: none;
      padding: 20px 0;
    }
    button.red {
      color: #e1306c;
    }
  }
  &__consumed {
    margin-bottom: 10px;
  }
}
</style>
