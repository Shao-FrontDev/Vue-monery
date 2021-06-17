<template>
  <div class="toast">
    <p>{{ message }}</p>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity";
export default {
  props: ["message"]
};

export const useToastEffect = () => {
  const toastData = reactive({ showToast: false, toastMessage: "" });

  const showToast = message => {
    toastData.showToast = true;
    toastData.toastMessage = message;
    setTimeout(() => {
      toastData.showToast = false;
      toastData.toastMessage = "";
    }, 2000);
  };
  return { toastData, showToast };
};
</script>

<style lang="scss" scoped>
.toast {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.35);
  padding: 10px;
  border-radius: 10px;
  color: #fff;
}
</style>
