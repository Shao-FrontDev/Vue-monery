<template>
  <div>
    <div class="output">
      <span>{{ output }}</span>
    </div>
    <div class="numberPad">
      <div class="numberPad__buttons">
        <button @click="inputContent" class="numberPad__buttons__item">
          1
        </button>
        <button @click="inputContent" class="numberPad__buttons__item">
          2
        </button>
        <button @click="inputContent" class="numberPad__buttons__item">
          3
        </button>
        <button @click="deleteNumber" class="numberPad__buttons__item">
          删除
        </button>
        <button @click="inputContent" class="numberPad__buttons__item">
          4
        </button>
        <button @click="inputContent" class="numberPad__buttons__item">
          5
        </button>
        <button @click="inputContent" class="numberPad__buttons__item">
          6
        </button>
        <button @click="clear" class="numberPad__buttons__item">清空</button>
        <button @click="inputContent" class="numberPad__buttons__item">
          7
        </button>
        <button @click="inputContent" class="numberPad__buttons__item">
          8
        </button>
        <button @click="inputContent" class="numberPad__buttons__item">
          9
        </button>
        <button
          class="numberPad__buttons__item numberPad__buttons__item--ok"
          @click="updateData"
        >
          OK
        </button>
        <button
          class="numberPad__buttons__item  numberPad__buttons__item--zero"
          @click="inputContent"
        >
          0
        </button>
        <button @click="inputContent" class="numberPad__buttons__item">
          .
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from "@vue/reactivity";
import { useStore } from "vuex";

export const useNumberPadEffect = () => {
  const store = useStore();
  const record = reactive({
    selectedTags: [],
    selectedNotes: "",
    selectedType: "-",
    selectedAmount: 0
  });
  const onUpdateTags = tags => {
    record.selectedTags = tags;
  };

  const onUpdateType = type => {
    record.selectedType = type;
  };
  const onUpdateAmount = amount => {
    record.selectedAmount = parseFloat(amount);
  };

  const saveRecord = () => {
    if (record.selectedAmount !== 0 && record.selectedTags.length !== 0) {
      store.commit("createRecord", record);
      record.selectedNotes = "";
      alert("已经保存");
      store.commit("toggleAnimation", false);
    } else {
      alert("请输入金额和选择标签");
    }
  };
  return {
    record,
    onUpdateTags,
    onUpdateType,
    onUpdateAmount,
    saveRecord
  };
};

export default {
  name: "NumberPad",

  setup(props, ctx) {
    const output = ref("0");
    const inputContent = event => {
      const input = event.target.innerText;

      if (output.value.length >= 16) return;
      if (output.value.includes(".") && input === ".") return;

      if (output.value === "0") {
        if ("0123456789".indexOf(input) >= 0) {
          output.value = input;
          ctx.emit("update:selectedAmount", output.value);
        } else {
          output.value += input;
          ctx.emit("update:selectedAmount", output.value);
        }
        return;
      }
      output.value += input;
      ctx.emit("update:selectedAmount", output.value);
    };
    const deleteNumber = () => {
      const result = output.value.substr(0, output.value.length - 1);
      output.value = result;
      if (result) {
        ctx.emit("update:selectedAmount", output.value);
      } else {
        output.value = "0";
        ctx.emit("update:selectedAmount", output.value);
      }
    };
    const clear = () => {
      output.value = "0";
      ctx.emit("update:selectedAmount", output.value);
    };
    const updateData = () => {
      ctx.emit("updateData");
      output.value = "0";
    };
    return {
      output,
      inputContent,
      deleteNumber,
      clear,
      updateData
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/constants.scss";

.numberPad {
  min-height: 256px;
  &__buttons {
    display: grid;
    grid-template-columns: repeat(4, auto);
    background-color: #ffdc80;
    &__item {
      outline: none;
      border: none;
      height: 64px;
      background-color: $number-item;
      color: white;
      cursor: pointer;
      margin: 5px;
      border-radius: 6px;
      &--ok {
        grid-column: 4 / 5;
        grid-row-start: 3;
        grid-row-end: 5;
        height: auto;
      }
      &--zero {
        grid-column-start: 1;
        grid-column-end: 3;
      }
    }
  }
}

.output {
  height: 72px;
  font-size: 36px;
  line-height: 72px;
  padding: 0 18px;
  text-align: right;
  background: #ffdc80;
  color: #333333;
}
</style>
