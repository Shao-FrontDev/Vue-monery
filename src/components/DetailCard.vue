<template>
  <div class="card">
    DetailCard
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { useStore } from "vuex";
export default {
  setup(props) {
    const route = useRoute();
    const store = useStore();
    const recordList = store.getters.recordList;
    const id = route.params.id;
    const item = recordList.filters(item => item.id === id);
  }
};
</script>

<style lang="scss" scoped>
.card {
  border-radius: 8px;
  background-color: #fff;
  padding: 0 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
