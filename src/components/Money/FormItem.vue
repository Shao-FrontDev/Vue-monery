<template>
  <div class="form-item">
    <label class="form-item__notes">
      <span class="form-item__notes__title">{{ filedName }}</span>
      <template v-if="type">
        <input
          :type="type"
          class="form-item__notes__input"
          :placeholder="placeholder"
          :value="x(value)"
          @input="$emit('update:value', $event.target.value)"
        />
      </template>
      <template v-else>
        <input
          type="text"
          class="form-item__notes__input"
          :placeholder="placeholder"
          :value="value"
          @input="$emit('update:value', $event.target.value)"
        />
      </template>
    </label>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  model: {
    prop: "value",
    event: "update:value"
  },
  props: {
    value: String,
    filedName: { type: String, required: true },
    placeholder: { type: String, defalut: "" },
    type: String
  },
  emits: ["update:value"],
  methods: {
    x(isoString) {
      return dayjs(isoString).format("YYYY-MM-DDTHH:mm");
    }
  }
};
</script>

<style lang="scss" scoped>
.form-item {
  background: #fff;
  &__notes {
    height: 64px;
    line-height: 64px;
    font-size: 16px;
    padding: 16px;
    &__title {
      margin-right: 12px;
    }
    &__input {
      border: none;
      outline: none;
      padding-left: 18px;
    }
  }
}
</style>
