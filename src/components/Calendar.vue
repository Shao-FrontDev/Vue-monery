<template>
  <div class="calender">
    <section class="header">
      {{ selectData.year }} 年{{ selectData.month }} 月{{ selectData.day }} 日
    </section>
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
    },

    //获取前后一个月的年月日信息
    getPreMonth(date, appointDay = 1) {
      let { year, month } = date || this.selectData;
      if (month === 1) {
        year -= 1;
        month = 12;
      } else {
        month -= 1;
      }
      return { year, month, day: appointDay };
    },

    getNextMonth(appointDay = 1) {
      let { year, month } = this.selectData;
      if (month === 12) {
        year += 1;
        month = 1;
      } else {
        month += 1;
      }

      return { year, month, day: appointDay };
    },

    //处理月数据
    dealMonthData(type, appointDay = 1) {
      this.isSelectedCurrentDate = false;
      switch (type) {
        case "PRE_MONTH":
          this.selectData = this.getPreMonth("", appointDay);
          break;
        case "NEXT_MONTH":
          this.selectData = this.getNextMonth(appointDay);
          break;
        default:
          break;
      }
      this.dataArr = this.getMonthData(this.selectData);
      this.lineNum = Math.ceil(this.dataArr.length / 7);
    },
    handlePreMonth() {
      this.dealMonthData("PRE_MONTH");
    },
    handleNextMonth() {
      this.dealMonthData("NEXT_MONTH");
    },
    changeAllData(val) {
      if (this.isSelectedCurrentDate) return;

      const preDate = this.getPreMonth();
      const preDataArr = this.getMonthData(preDate, true);
      const nextDate = this.getNextMonth();
      const nextDataArr = this.getMonthData(nextDate, true);

      setTimeout(() => {
        this.allDataArr = [preDataArr, val, nextDataArr];
        this.translateIndex = 0;
        this.needAnimation = false;
      }, this.transitionDuration * 1000);
    },

    touchStart(event) {
      this.isTouching = true;
      this.needAnimation = true;

      this.touchStartPositionX = event.touches[0].clientX;
      this.touchStartPositionY = event.touches[0].clientY;
    },
    touchMove(event) {
      const moveX = event.touches[0].clientX - this.touchStartPositionX;
      const moveY = event.touches[0].clientY - this.touchStartPositionY;

      //左右
      if (Math.abs(moveX) > Math.abs(moveY)) {
        this.needAnimation = false;
        this.touch = {
          x: moveX / this.$refs.calendar.offsetWidth,
          y: 0
        };
      } else {
        this.needHeightAnimation = true;
        this.touch = {
          x: 0,
          y: moveY / this.$refs.calendar.offsetWidth
        };
      }
    },
    touchEnd() {
      this.isTouching = false;
      const { x, y } = this.touch;

      if (Math.abs(x) > Math.abs(y) && Math.abs(x) > 0.3) {
        if (x > 0) {
          this.translateIndex -= 1;
          this.handlePreMonth();
        } else if (x < 0) {
          this.translateIndex += 1;
          this.handleNextMonth();
        }
      }
      this.touch = {
        x: 0,
        y: 0
      };
    }
  },
  created() {
    this.getCurrentDate();
    this.getMonthData(this.selectData);
  },
  watch: {
    dataArr: {
      hadnle(val) {
        this.changeAllData(val);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.calendar {
  overflow-x: hidden;
}

.header {
  padding: 0 5px;
  font-size: 18px;
  font-weight: 500;
  color: #2b4450;
  line-height: 44px;
  margin: 0 calc((14.285%-40px) / 2 + 6px);
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
