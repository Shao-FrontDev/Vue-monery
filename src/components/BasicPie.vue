<template>
  <div class="pie-wrapper">
    <tabs :type="type" @update:changeType="handlerType" />
    <div class="bar" ref="bar"></div>
  </div>
</template>

<script>
import { reactive, ref, computed } from "@vue/reactivity";
import { onMounted, watch } from "@vue/runtime-core";
import { handlerDuplicated } from "@/utlis/tool";

import * as echarts from "echarts";
import { useStore } from "vuex";
import Tabs from "./Tabs.vue";
export default {
  components: { Tabs },
  setup() {
    let recordList = reactive({});
    const store = useStore();
    const curMonth = computed(() => store.getters.currentMonth);
    console.log("22", curMonth.value);
    recordList = store.getters.recordList;
    const bar = ref(null);
    const type = ref("-");
    let echart = null;

    const option = reactive({
      tooltip: {
        trigger: "item"
      },
      series: [
        {
          type: "pie",
          radius: "50%",
          data: [],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ]
    });

    const handlerType = TYPE => {
      type.value = TYPE;
    };
    const PieDataFomate = (data, type, month) => {
      const dataArr = [];
      const filterData = data
        .filter(item => item.selectedType === type)
        .filter(item => item.createAt.startsWith(month));
      for (let i = 0; i < filterData.length; i++) {
        const name = filterData[i].selectedTags[0].content;
        const value = filterData[i].selectedAmount;
        const item = { value, name };

        dataArr.push(item);
      }
      // console.log(dataArr);
      option.series[0].data = handlerDuplicated(dataArr);
    };

    onMounted(() => {
      PieDataFomate(recordList, type.value, curMonth.value);
      echart = echarts.init(bar.value);
      echart.setOption(option);
    });
    watch([type, curMonth], newValue => {
      option.series[0].data = [];
      console.log("watch", ...newValue);
      PieDataFomate(recordList, ...newValue);
      echart.setOption(option);
    });
    watch(curMonth, (newVlaue, oldValue) => {
      console.log(newVlaue, oldValue);
    });

    return { bar, type, handlerType };
  }
};
</script>

<style lang="scss" scoped>
.pie-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.bar {
  margin-top: 20px;
  width: 100%;
  height: 250px;
}
</style>
