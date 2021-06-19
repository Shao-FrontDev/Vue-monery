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
  setup() {
    const bar = ref(null);

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
            data: [
              { value: 1048, name: "搜索引擎" },
              { value: 735, name: "直接访问" },
              { value: 580, name: "邮件营销" },
              { value: 484, name: "联盟广告" },
              { value: 300, name: "视频广告" }
            ],
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
