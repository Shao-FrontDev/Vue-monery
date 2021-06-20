<template>
  <div class="pie-wrapper">
    <tabs :type="type" @update:changeType="handlerType" />
    <div class="bar" ref="bar"></div>
  </div>
</template>

<script>
import { reactive, ref } from "@vue/reactivity";
import { onMounted, watch } from "@vue/runtime-core";

import * as echarts from "echarts";
import { useStore } from "vuex";
import Tabs from "./Tabs.vue";
export default {
  components: { Tabs },
  setup() {
    let recordList = reactive({});
    const store = useStore();
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
    const PieDataFomate = (data, type) => {
      const filterData = data.filter(item => item.selectedType === type);
      for (let i = 0; i < filterData.length; i++) {
        const name = filterData[i].selectedTags[0].content;
        const value = filterData[i].selectedAmount;
        const item = { value, name };
        option.series[0].data.push(item);
      }
    };

    onMounted(() => {
      PieDataFomate(recordList, type.value);
      echart = echarts.init(bar.value);
      echart.setOption(option);
    });
    watch(type, newValue => {
      console.log(newValue);
      option.series[0].data = [];
      PieDataFomate(recordList, newValue);
      echart.setOption(option);
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
  width: 100%;
  height: 250px;
}
</style>
