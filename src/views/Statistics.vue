<template>
  <Layout>
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
import { computed } from "@vue/runtime-core";

export default {
  // data() {
  //   return { recordList: {} };
  // },
  components: { Card },
  // created() {
  //   this.$store.commit("fetchRecords");
  //   this.recordList = this.$store.getters.recordList;
  // },
  // computed: {
  // cardList() {
  //   const { recordList } = this;
  //   if (recordList.length === 0) {
  //     return [];
  //   }
  //   const hashTable = {};
  //   const newList = clone(
  //     recordList.sort(
  //       (a, b) => dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf()
  //     )
  //   );
  //   for (let i = 0; i < newList.length; i++) {
  //     const [date, time] = newList[i].createAt.split("T");
  //     hashTable[date] = hashTable[date] || {
  //       title: date,
  //       items: [],
  //       input: 0,
  //       outcome: 0
  //     };
  //     hashTable[date].items.push(newList[i]);
  //     hashTable[date].outcome += calculate(newList[i], "-");
  //     hashTable[date].input += calculate(newList[i], "+");
  //   }
  //   console.log(hashTable);
  //   return hashTable;
  // }
  // },
  // methods: {
  //   toBeautify(value) {
  //     return beautify(value);
  //   }
  // },
  setup() {
    let recordList = reactive({});
    const store = useStore();
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
          input: 0,
          outcome: 0
        };
        hashTable[date].items.push(newList[i]);
        hashTable[date].outcome += calculate(newList[i], "-");
        hashTable[date].input += calculate(newList[i], "+");
      }
      console.log(hashTable);

      return hashTable;
    });
    const toBeautify = value => {
      return beautify(value);
    };
    return {
      recordList,
      cardList,
      toBeautify
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/constants.scss";

.item-wrapper {
  display: block;
  margin: 10px;
  border-radius: 16px;
}
</style>
