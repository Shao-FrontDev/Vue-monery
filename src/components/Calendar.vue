<template>
  <div class="calender">
    <ul class="week-area">
      <li class="week-item" v-for="(item, index) in weekArr" :key="index">
        {{ item }}
      </li>
    </ul>
    <ul class="data-area">
      <li class="calender-item" v-for="(item, index) in dataArr" :key="index">
        {{ item.day }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      weekArr: ["日", "一", "二", "三", "四", "五", "六"],
      dataArr: Array(40).fill(0, 0, 40),
      selectData: {},
      allDataArr: [],
      isSelectedCurrentDate: false,
      translateIndex: 0,
      transitionDuration: 0.3,
      needAnimation: true,
      isTouching: false,
      touchStartPositionX: null,
      touchStartPositionY: null,
      touch: { x: 0, y: 0 }
    };
  },
  methods: {
    getCurrentDate() {
      this.selectData = {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        day: new Date().getDate()
      };
    },
    getMonthData(date) {
      const { year, month, day } = date;
      const dataArr = [];
      const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

      //闰年处理
      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        daysInMonth[1] = 29;
      }

      const monthStartWeekDay = new Date(year, month - 1, 1).getDate();
      const monthEndWeekDay = new Date(year, month, 1).getDate();

      for (let i = 0; i < monthStartWeekDay; i++) {
        const emptyObj = {
          type: "pre",
          day: "",
          month: "",
          year: ""
        };
        dataArr.push(emptyObj);
      }

      for (let i = 0; i < daysInMonth[month - 1]; i++) {
        const itemObj = {
          type: "nomarl",
          day: i + 1,
          month,
          year,
          isSelected: Number(day) === i + 1
        };
        dataArr.push(itemObj);
      }

      for (let i = 0; i < 6 - monthEndWeekDay; i++) {
        const emptyObj = {
          type: "next",
          day: "",
          month: "",
          year: ""
        };
        dataArr.push(emptyObj);
      }
      this.dataArr = dataArr;
    },

    //切换点选日期
    checkoutDate(selectData) {
      if (selectData.type !== "normal") return;

      this.selectData.day = selectData;

      //查找当前选中日期的索引
      const oldSelectIndex = this.dataArr.findIndex(
        item => item.isSelected && item.type === "nomarl"
      );
      const newSelectIndex = this.dataArr.findIndex(
        item => item.day === selectData.day && item.type === "nomarl"
      );

      if (this.dataArr[oldSelectIndex]) {
        this.$set(this.dataArr[oldSelectIndex], "isSelected", false);
      }

      if (this.dataArr[newSelectIndex]) {
        this.$set(this.dataArr[newSelectIndex], "isSelected", true);
      }
    },
    //切换点选月份
    checkoutPreMonth() {
      let { year, month } = this.selectData;
      if (month === 1) {
        year -= 1;
        month = 12;
      } else {
        month -= 1;
      }

      this.selectData = { year, month, day: 1 };
      this.dataArr = this.getMonthData(this.selectData);
    },
    //获取今日
    checkoutCurrentDate() {
      this.getCurrentDate();
      this.dataArr = this.getMonthData(this.selectData);
    }
  },
  created() {
    this.getCurrentDate();
    this.getMonthData(this.selectData);
  }
};
</script>

<style lang="scss" scoped>
.calendar {
  overflow-x: hidden;
}

.week-area {
  width: 100%;
  display: flex;
}

.week-item {
  flex: 0 0 14.285%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.data-area {
  width: 100%;
  display: flex;
  flex-flow: row wrap;
}

.calender-item {
  cursor: pointer;
  flex: 0 0 14.285%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.calender-item:hover {
  background: #333333;
  color: white;
  border-radius: 50%;
}
</style>
