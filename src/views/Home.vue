<template>
  <Layout>
    <div class="home">
      <h1 class="home__title">Today</h1>
      <main class="home__content">
        <div class="home__content__upper">
          <h2>今日支出</h2>
          <h2>￥{{ sum.output || 0 }}</h2>
          <h3>收入￥{{ sum.input || 0 }}</h3>
        </div>
        <div class="home__content__bottom" @click="handlerBalance">
          <h3>月预算剩余{{ balance || 0 }}</h3>
          <h3>余下日均{{ average || 0 }}</h3>
        </div>
      </main>
      <div>
        <button class="home__button" @click="handlerAnimation">记一笔</button>
      </div>
    </div>
    <div class="record" :class="{ animation: isAnimation }"><Money /></div>
  </Layout>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Money from "@/components/Money.vue";
import dayjs from "dayjs";
export default {
  name: "Home",
  data() {
    return {
      recordList: []
    };
  },
  created() {
    this.$store.commit("fetchRecords");
    this.$store.commit("fetchBalance");
    this.recordList = this.$store.getters.recordList;
    this.balance = this.$store.getters.balance;
  },
  components: { Money },
  computed: {
    ...mapGetters(["isAnimation", "balance"]),
    sum() {
      const { recordList } = this;
      if (recordList.length === 0) {
        return [];
      }
      const today = [];

      for (let i = 0; i < recordList.length; i++) {
        const td = new Date();
        if (dayjs(td).isSame(recordList[i].createAt, "day")) {
          today.push(recordList[i]);
        }
      }
      let input = 0;
      let output = 0;
      for (let i = 0; i < today.length; i++) {
        if (today[i].selectedType === "+") {
          input += today[i].selectedAmount;
        } else {
          output += today[i].selectedAmount;
        }
      }

      return { input, output };
    },
    average() {
      const averagePerDay = dayjs().endOf("month").$D - dayjs().date();
      const result = (this.balance / averagePerDay).toFixed(2);
      if (this.balance === null) {
        return 0;
      } else {
        return result;
      }
    }
  },
  methods: {
    ...mapMutations(["toggleAnimation"]),
    handlerAnimation() {
      this.toggleAnimation(true);
    },
    handlerBalance() {
      const balance = window.prompt("请输入当月的预算：");
      if (balance.trim() !== "" && balance !== null) {
        this.$store.commit("createBalance", balance);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/helper.scss";
@import "../assets/styles/constants.scss";

.wrapper {
  height: 93vh;
  overflow: hidden;
}
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  &__content {
    &__upper {
      padding: 30px 0;
    }
    padding-bottom: 50px;
    h2 {
      text-align: center;
    }
    h3 {
      text-align: center;
    }
    &__bottom {
      cursor: pointer;
      padding: 20px 40px;
      border-radius: 8px;
      background-color: rgba($color: #6b6b6b, $alpha: 0.1);
    }
  }
  &__title {
    position: relative;
    text-align: center;
    font-weight: 900;
    margin-bottom: 50px;
    text-transform: uppercase;
  }
  &__button {
    cursor: pointer;
    border: none;
    background: $create-button;
    border-radius: 16px;
    color: white;
    height: 50px;
    width: 100px;
  }
}

.record {
  position: absolute;
  height: 93vh;
  width: 100vw;
  /* background-color: rgba($color: #000000, $alpha: 0.5); */
  transition: all 1s ease-in-out;
  transform: translateY(100%);
}
.record.animation {
  transform: translateY(0);
  transform: scale(1);
}
</style>
