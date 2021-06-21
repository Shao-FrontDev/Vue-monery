<template>
  <template v-if="visible">
    <div class="dialog-wrapper">
      <main>删除后无法恢复，是否删除？</main>
      <footer>
        <button class="btn" @click="fail">取消</button>
        <button class="btn btn-red" @click="success">删除</button>
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
    const success = () => {
      props.ok();
    };
    const fail = () => {
      props.cancel();
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
  padding: 10px 10px 10px;
  width: 320px;
  background: #fff;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

main {
  padding: 50px 20px;
  text-align: center;
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
