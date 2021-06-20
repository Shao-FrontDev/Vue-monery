<template>
  <Layout>
    <!-- <calendar /> -->
    <basic-bar />
    <ol>
      <li v-for="(card, index) in cardList" :key="index" class="item-wrapper">
        <Card :card="card" />
      </li>
    </ol>
    <div class="affix">
      <Button color="#F56040" @click="handlerOpen">
        选择月份
      </Button>
    </div>
    <div class="month" :class="{ open: isOpen }">
      <header @click="handlerClose"></header>
    </div>
  </Layout>
</template>

<script>
import dayjs from "dayjs";
import { clone } from "@/utility/tool";
import { calculate } from "@/utility/tool";
import { beautify } from "@/utility/tool";
import Card from "@/components/Card.vue";
import { reactive, ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
import BasicBar from "@/components/BasicPie.vue";
import Button from "@/components/Button.vue";

export default {
  components: { Card, BasicBar, Button },
  setup() {
    let recordList = reactive({});
    const isOpen = ref(false);
    const store = useStore();
    const PieData = reactive([]);
    store.commit("fetchRecords");
    recordList = store.getters.recordList;

    const handlerClose = () => {
      isOpen.value = false;
      console.log(isOpen.value);
    };
    const handlerOpen = () => {
      console.log("open");
      isOpen.value = !isOpen.value;
    };

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

    const toBeautify = value => {
      return beautify(value);
    };
    return {
      recordList,
      cardList,
      toBeautify,
      PieData,
      isOpen,
      handlerClose,
      handlerOpen
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

.affix {
  position: fixed;
  bottom: 100px;
  right: 20px;
  border-radius: 16px;
  box-shadow: 1px 1px 5px 5px rgba($color: #333333, $alpha: 0.3);
  transition: all 1s ease;
}
.affix:hover {
  transform: scale(1.08);
}

.month {
  position: absolute;
  height: 50vh;
  width: 100vw;
  border-bottom-left-radius: 32px;
  border-bottom-right-radius: 32px;
  background: $close-button;
  transition: all 1s ease-in-out;
  transform: translateY(-120%);
}
.month.open {
  transform: translateY(-14%);
}
</style>
