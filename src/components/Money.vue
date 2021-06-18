<template>
  <div class="wrapper">
    {{ record }}
    <Types @update:selectedType="onUpdateType" :type="record.selectedType">
      <button class="wrapper__button">Close</button>
    </Types>
    <Tags
      @update:dataSource="updateData"
      :dataSource="tagList"
      @update:selectedTags="onUpdateTags"
    />
    <FormItem
      v-model:value="record.selectedNotes"
      filedName="备注"
      placeholder="在这里输入备注"
    />
    <FormItem
      v-model:value="record.createAt"
      filedName="日期"
      placeholder="在这里输入备注"
      type="datetime-local"
    />
    <NumberPad
      @update:selectedAmount="onUpdateAmount"
      @updateData="saveRecord"
    />
    <Toast v-if="toastData.showToast" :message="toastData.toastMessage"></Toast>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";

import NumberPad, {
  useNumberPadEffect
} from "@/components/Money/NumberPad.vue";
import Tags from "@/components/Money/Tags.vue";
import Types from "@/components/Money/Types.vue";
import FormItem from "@/components/Money/FormItem.vue";
import Toast from "@/components/Toast.vue";

export default {
  components: {
    NumberPad,
    Tags,
    Types,
    FormItem,
    Toast
  },

  setup() {
    const active = ref(false);
    const tags = ref(null);

    const {
      record,
      onUpdateTags,
      onUpdateType,
      onUpdateAmount,
      saveRecord,
      toastData
    } = useNumberPadEffect();

    const store = useStore();
    store.commit("fetchTags");

    const updateData = tag => {
      store.commit("createTag", tag);
    };

    const tagList = computed(() => store.getters.tagList);
    return {
      active,
      tags,
      record,
      updateData,
      onUpdateTags,
      onUpdateType,
      onUpdateAmount,
      saveRecord,
      tagList,
      toastData
    };
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/helper.scss";
.wrapper {
  display: flex;
  flex-direction: column;
  &__button {
    position: absolute;
    top: 5px;
    left: 5px;
    cursor: pointer;
    border: none;
    background: #e1306c;
    border-radius: 16px;
    color: white;
    height: 50px;
    width: 100px;
  }
}
</style>
