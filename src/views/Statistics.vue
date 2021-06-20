<template>
  <Layout>
    <!-- <calendar /> -->
    <basic-bar :data="PieData" />
    <ol>
      <li v-for="(card, index) in cardList" :key="index" class="item-wrapper">
        <Card :card="card" />
      </li>
    </ol>
  </Layout>
</template>

<script>
import dayjs from "dayjs";
import { clone } from "@/utility/tool";
import { calculate } from "@/utility/tool";
import { beautify } from "@/utility/tool";
import Card from "@/components/Card.vue";
import { reactive } from "@vue/reactivity";
import { useStore } from "vuex";
import { computed, onMounted } from "@vue/runtime-core";
import BasicBar from "@/components/BasicBar.vue";
import Calendar from "@/components/Calendar.vue";

export default {
  components: { Card, BasicBar, Calendar },
  setup() {
    let recordList = reactive({});
    const store = useStore();
    const PieData = reactive([]);
    store.commit("fetchRecords");
    recordList = store.getters.recordList;

    const cardList = computed(() => {
      if (recordList.length === 0) {
        return [];
      }
      const hashTable = {};
      const newList = clone(
        recordList.sort(
          (a, b) => dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf()
        )
      );
      for (let i = 0; i < newList.length; i++) {
        const [date, time] = newList[i].createAt.split("T");
        hashTable[date] = hashTable[date] || {
          title: date,
          items: [],
          income: 0,
          expense: 0
        };
        hashTable[date].items.push(newList[i]);
        hashTable[date].expense += calculate(newList[i], "-");
        hashTable[date].income += calculate(newList[i], "+");
      }

      return hashTable;
    });

    const PieDataFomate = data => {
      for (let i = 0; i < data.length; i++) {
        const name = data[i].selectedTags[0].content;
        const value = data[i].selectedAmount;
        const item = { value, name };
        PieData.push(item);
      }
    };
    onMounted(() => {
      PieDataFomate(recordList);
      console.log(PieData);
    });
    const toBeautify = value => {
      return beautify(value);
    };
    return {
      recordList,
      cardList,
      toBeautify,
      PieData
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/constants.scss";

.item-wrapper {
  display: block;
  margin: 20px 10px;
  border-radius: 16px;
}
</style>
