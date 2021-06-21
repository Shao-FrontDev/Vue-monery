<template>
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
      <Button @click="deleteTag" color="#e1306c">删除标签</Button>
    </div>
    <Dialog :visible="false" />
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

export default {
  components: { Icon, FormItem, Button, Dialog },
  setup() {
    const id = ref(null);
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    id.value = route.params.id;
    const back = () => {
      router.push({ name: "Labels" });
    };
    const deleteTag = () => {
      store.commit("deleteTag", id.value);
      router.push({ name: "Labels" });
    };
    const update = e => {
      const tag = { id: id.value, content: e.target.value };

      store.commit("updateTag", tag);
    };
    const tag = computed(() => {
      const tag = store.getters.tagList.filter(item => item.id === id.value)[0];
      return tag;
    });
    return {
      back,
      update,
      deleteTag,
      tag
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
</style>
