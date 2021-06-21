<template>
  <template v-if="visible">
    <div class="dialog-wrapper">
      <main>删除后无法恢复，是否删除？</main>
      <footer>
        <button class="btn" @click="fail">取消</button>
        <button class="btn btn-red">删除</button>
      </footer>
    </div>
  </template>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: () => {
        return false;
      }
    },
    ok: {
      type: Function
    },
    cancel: { type: Function }
  },
  setup(props, context) {
    const success = () => {};
    const close = () => {
      context.emit("update:visible", false);
    };
    const fail = () => {
      close();
    };
    return {
      success,
      fail,
      close
    };
  }
};
</script>

<style lang="scss" scoped>
.dialog-wrapper {
  border-radius: 16px;
  padding: 40px 30px 10px;
  background: #fff;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

main {
  padding: 50px;
}

footer {
  display: flex;
}
.btn {
  cursor: pointer;
  background: none;
  border: none;
  padding: 8px;
  width: 50%;
}
.btn-red {
  color: #e1306c;
}
</style>
