<template>
  <div>
    <div class="bar" ref="bar"></div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";

import * as echarts from "echarts";
export default {
  props: {
    data: Array,
    default: () => {
      return [];
    }
  },
  setup(props) {
    const bar = ref(null);

    console.log("data", props.data);
    onMounted(() => {
      const echartBar = echarts.init(bar.value);
      const option = {
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
            data: props.data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      echartBar.setOption(option);
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
