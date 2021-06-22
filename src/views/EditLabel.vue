<template>
  <div :class="{ overlay: visible }"></div>
  <Layout>
    <div class="navbar">
      <Icon name="left" class="navbar__icon" @click="back" />
      <span class="navbar__title">编辑标签</span>
    </div>
    <FormItem
      filedName="标签名"
      placeholder="请输入标签名"
      :value="tag.content"
      @change="update"
    />
    <div class="marigin-top">
      <Button @click="openVisible" color="#e1306c">删除标签</Button>
    </div>
    <transition name="dialog">
      <Dialog
        :visible="visible"
        :ok="deleteTag"
        :cancel="closeVisible"
        class="dialog"
      />
    </transition>
    <Toast v-if="toastData.showToast" :message="toastData.toastMessage" />
  </Layout>
</template>

<script>
import { useStore } from "vuex";
import Icon from "@/components/Icon.vue";
import FormItem from "@/components/Money/FormItem.vue";
import Button from "@/components/Button.vue";
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Dialog from "@/components/Dialog.vue";

import Toast, { useToastEffect } from "@/components/Toast.vue";

export default {
  components: { Icon, FormItem, Button, Dialog, Toast },
  setup() {
    const id = ref(null);
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const { toastData, showToast } = useToastEffect();

    const visible = ref(false);
    id.value = route.params.id;
    const back = () => {
      router.push({ name: "Labels" });
    };
    const deleteTag = () => {
      store.commit("deleteTag", id.value);
      router.push({ name: "Labels" });
    };

    const openVisible = () => {
      visible.value = true;
    };
    const closeVisible = () => {
      visible.value = false;
    };
    const update = e => {
      const tag = { id: id.value, content: e.target.value };

      store.commit("updateTag", tag);
      showToast("修改成功");
    };
    const tag = computed(() => {
      const tag = store.getters.tagList.filter(item => item.id === id.value)[0];
      return tag;
    });
    return {
      back,
      update,
      deleteTag,
      tag,
      visible,
      openVisible,
      closeVisible,
      toastData
    };
  }
};
</script>

<style lang="scss" scoped>
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

input {
  height: 40px;
}
.marigin-top {
  margin-top: 44px;
  display: flex;
  justify-content: center;
}

.dialog-enter-active,
.dialog-leave-active {
  transition: opacity 0.8s ease;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
}

.dialog {
  z-index: 101;
}

.overlay {
  z-index: 100;
  position: fixed;
  height: 100vh;
  width: 100vw;
  background: rgb(0, 0, 0);
  opacity: 0.3;
}
</style>
