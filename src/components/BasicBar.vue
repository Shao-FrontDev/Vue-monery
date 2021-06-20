<template>
  <div>
    <div class="bar" ref="bar"></div>
  </div>
</template>

<script>
import { reactive, ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";

import * as echarts from "echarts";
import { useStore } from "vuex";
export default {
  setup() {
    let recordList = reactive({});
    const store = useStore();
    recordList = store.getters.recordList;
    const bar = ref(null);
    let echart = null;
    const option = reactive({
      title: {
        text: "当月支出和收入",
        left: "center"
      },
      tooltip: {
        trigger: "item"
      },

      series: [
        {
          name: "访问来源",
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

    const PieDataFomate = data => {
      for (let i = 0; i < data.length; i++) {
        const name = data[i].selectedTags[0].content;
        const value = data[i].selectedAmount;
        const item = { value, name };
        option.series[0].data.push(item);
      }
    };

    onMounted(() => {
      PieDataFomate(recordList);
      echart = echarts.init(bar.value);
      echart.setOption(option);
    });

    return { bar };
  }
};
</script>

<style lang="scss" scoped>
.bar {
  padding: 40px;
  width: 100%;
  height: 400px;
}
</style>
