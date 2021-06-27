<template>
  <Layout>
    <BasicPie />
    <div v-if="JSON.stringify(cardList) !== '{}'">
      <ol>
        <li v-for="(card, index) in cardList" :key="index" class="item-wrapper">
          <Card :card="card" />
        </li>
      </ol>
    </div>
    <div v-else>
      <h1 class="info">这个月的记录为空</h1>
    </div>
    <div class="affix">
      <Button color="#F56040" @click="handlerOpen" class="btn">
        选择月份
      </Button>
    </div>
    <div class="month" :class="{ open: isOpen }">
      <MonthPick @update:month="selectedMonth" />
    </div>
  </Layout>
</template>

<script>
import dayjs from "dayjs";
import { clone } from "@/utlis/tool";
import { calculate } from "@/utlis/tool";
import { beautify } from "@/utlis/tool";
import Card from "@/components/Card.vue";
import { reactive, ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
import BasicPie from "@/components/BasicPie.vue";
import Button from "@/components/Button.vue";
import MonthPick from "@/components/MonthPick.vue";

export default {
  components: { Card, BasicPie, Button, MonthPick },
  setup() {
    let recordList = reactive({});
    const isOpen = ref(false);
    const store = useStore();
    const PieData = reactive([]);
    const currentMonth = ref(store.getters.currentMonth);

    store.commit("fetchRecords");
    recordList = store.getters.recordList;

    const selectedMonth = month => {
      currentMonth.value = month;
      store.commit("updateSelectedMonth", month);
      isOpen.value = false;
    };

    const handlerClose = () => {
      isOpen.value = false;
    };

    const handlerOpen = () => {
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
        const [date, _] = newList[i].createAt.split("T");
        if (date.startsWith(currentMonth.value)) {
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
      handlerOpen,
      selectedMonth
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
  .btn {
    background: rgba($color: #333333, $alpha: 0.3);
  }
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

.info {
  text-align: center;
}
</style>
