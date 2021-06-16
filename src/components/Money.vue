<template>
  <div class="wrapper">
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
    <NumberPad
      @update:selectedAmount="onUpdateAmount"
      @updateData="saveRecord"
    />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

import NumberPad from "@/components/Money/NumberPad.vue";
import Tags from "@/components/Money/Tags.vue";
import Types from "@/components/Money/Types.vue";
import FormItem from "@/components/Money/FormItem.vue";

export default {
  components: {
    NumberPad,
    Tags,
    Types,
    FormItem
  },
  data() {
    return {
      output: "200",
      active: false,
      tags: null,
      record: {
        selectedTags: [],
        selectedNotes: "",
        selectedType: "-",
        selectedAmount: 0
      },
      recordList: null
    };
  },

  methods: {
    ...mapMutations(["createTag", "toggleAnimation"]),
    clear() {
      this.output = ``;
    },
    changeState() {
      this.active = !this.active;
    },
    updateData(tag) {
      this.createTag(tag);
    },

    onUpdateTags(tags) {
      this.record.selectedTags = tags;
    },

    onUpdateType(type) {
      this.record.selectedType = type;
    },
    onUpdateAmount(amount) {
      this.record.selectedAmount = parseFloat(amount);
    },
    saveRecord() {
      if (
        this.record.selectedAmount !== 0 &&
        this.record.selectedTags.length !== 0
      ) {
        this.$store.commit("createRecord", this.record);
        this.record.selectedNotes = "";
        alert("已经保存");
        this.toggleAnimation(false);
      } else {
        alert("请输入金额和选择标签");
      }
    }
  },

  created() {
    this.$store.commit("fetchTags");
  },
  computed: {
    ...mapGetters(["tagList"])
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
