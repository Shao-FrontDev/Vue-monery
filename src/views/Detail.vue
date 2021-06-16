<template>
  <div class="detail-wrapper">
    <div class="navbar">
      <Icon name="left" class="navbar__icon" @click="back" />
      <span class="navbar__title">账单详情</span>
    </div>
    <DetailCard />
  </div>
</template>

<script>
import DetailCard from "@/components/DetailCard.vue";
import { useRouter } from "vue-router";
export default {
  name: "Detail",
  components: { DetailCard },
  setup(props) {
    const { id } = props;
    const router = useRouter();
    const back = () => {
      router.push({ name: "Statistics" });
    };
    return { back };
  }
};
</script>

<style lang="scss" scoped>
.detail-wrapper {
  background-color: #f5f5f5;
  height: 100%;
}
.navbar {
  position: relative;
  height: 48px;
  line-height: 48px;
  text-align: center;
  background: #fff;
  margin-bottom: 8px;

  &__icon {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
  }
  &__title {
    font-size: 16px;
  }
}
</style>
