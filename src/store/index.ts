import { createStore } from "vuex";
import { v4 as uuidv4 } from "uuid";
import { clone } from "@/utlis/tool";

const localStorageTagsKeyName = "tagList";
const localStorageRecordsKeyName = "recordList";
const localStorageBalanceKeyName = "balance";

interface TagItem {
  content: string;
  id: string;
}

interface RecordItem {
  selectedTags: Array<String>;
  selectedNotes: string;
  selectedType: "-" | "+";
  selectedAmount: number;
  createAt?: string;
  id?: string;
}

const MockTagsData = [
  { content: "交通费用", id: "d8d8c54a-32cf-452d-b522-c0702b8dfa35" },
  { content: "工资", id: "cbcf2514-6c0c-4eba-ac0e-c68636fa251c" },
  { content: " 日常生活", id: "0f1f92e4-aa80-4abb-b698-2e284088437f" },
  { content: "电子产品", id: "6a75c416-c315-4876-a1e8-b95818d7c463" },
  { content: "话费", id: "b1f17ed6-07f0-4839-9f69-e0fa14034039" },
  { content: "游戏", id: "c1929d09-96f8-4002-8b1b-8e2253b3ce95" },
  { content: "美容", id: "20221362-f312-4d12-b391-b2562a152547" },
  { content: "学习", id: "e513726a-1b49-4d2f-a0b6-6d426525a764" }
];

const MockRecordsData = [
  {
    selectedTags: [
      { content: "交通费用", id: "d8d8c54a-32cf-452d-b522-c0702b8dfa35" }
    ],
    selectedNotes: "打车",
    selectedType: "-",
    selectedAmount: 50,
    createAt: "2021-06-17T05:58:54.458Z",
    id: "a917161a-4634-4ce3-8d7b-87ce2343414e"
  },
  {
    selectedTags: [
      { content: "学习", id: "e513726a-1b49-4d2f-a0b6-6d426525a764" }
    ],
    selectedNotes: "买笔记本",
    selectedType: "-",
    selectedAmount: 99,
    createAt: "2021-06-17T05:58:24.440Z",
    id: "ba5fef60-2725-4880-a2b5-0f502707d083"
  },
  {
    selectedTags: [
      { content: "游戏", id: "c1929d09-96f8-4002-8b1b-8e2253b3ce95" }
    ],
    selectedNotes: "充值原神",
    selectedType: "-",
    selectedAmount: 520,
    createAt: "2021-06-13T05:58:10.914Z",
    id: "c7254312-8db2-4979-951d-d8eeb86d4f07"
  },
  {
    selectedTags: [
      { content: "工资", id: "cbcf2514-6c0c-4eba-ac0e-c68636fa251c" }
    ],
    selectedNotes: "",
    selectedType: "+",
    selectedAmount: 3500,
    createAt: "2021-06-15T06:06:16.351Z",
    id: "0129c2ef-43eb-4b8d-9122-2a198d3e0e97"
  },
  {
    selectedTags: [
      { content: " 日常生活", id: "0f1f92e4-aa80-4abb-b698-2e284088437f" }
    ],
    selectedNotes: "购买生活用品",
    selectedType: "-",
    selectedAmount: 129,
    createAt: "2021-06-17T06:06:38.856Z",
    id: "5fbf1034-2b9f-4877-800f-41ea2d3f4e85"
  }
];

export const store = createStore({
  state: {
    tagList: [] as TagItem[],
    isAnimation: false,
    recordList: [] as RecordItem[],
    balance: null
  },
  mutations: {
    createTag(state, name) {
      if (name === null) return;
      if (name.trim() === "") {
        window.alert("标签名不能为空");
      } else {
        const isExist = (state.tagList as Array<TagItem>).findIndex(
          element => element.content === name
        );
        if (isExist !== -1) {
          alert("标签已经存在");
          return;
        } else {
          const tag = {
            content: name,
            id: uuidv4()
          };
          (state.tagList as Array<TagItem>).push(tag);
          store.commit("saveTag", state.tagList);
        }
      }
    },
    fetchTags(state) {
      state.tagList =
        JSON.parse(
          window.localStorage.getItem(localStorageTagsKeyName) as string
        ) || MockTagsData;
    },
    deleteTag(state, id) {
      const newtagList = (state.tagList as Array<TagItem>).filter(
        tag => tag.id !== id
      );
      state.tagList = newtagList;
      store.commit("saveTag", state.tagList);
    },
    updateTag(state, payload) {
      const filtertagList = (state.tagList as Array<TagItem>).filter(
        tag => tag.id !== payload.id
      );
      const tag: TagItem = { id: payload.id, content: payload.content };
      state.tagList = [...filtertagList, tag];
      store.commit("saveTag", state.tagList);
    },
    saveTag(state, data) {
      window.localStorage.setItem(
        localStorageTagsKeyName,
        JSON.stringify(data)
      );
    },
    toggleAnimation(state, payload) {
      state.isAnimation = payload;
    },
    fetchRecords(state) {
      state.recordList =
        JSON.parse(
          window.localStorage.getItem(localStorageRecordsKeyName) as string
        ) || MockRecordsData;
    },
    createRecord(state, record) {
      record.createAt = record.createAt || new Date().toISOString();
      record.id = uuidv4();
      const record2: RecordItem = clone(record);
      state.recordList.push(record2);

      store.commit("saveRecords");
    },
    deleteRecord(state, id) {
      const newRecordList = state.recordList.filter(item => item.id !== id);
      state.recordList = newRecordList;
      store.commit("saveRecords");
    },
    saveRecords(state) {
      window.localStorage.setItem(
        localStorageRecordsKeyName,
        JSON.stringify(state.recordList)
      );
    },
    saveBalance(state) {
      window.localStorage.setItem(
        localStorageBalanceKeyName,
        JSON.stringify(state.balance)
      );
    },
    createBalance(state, payload) {
      state.balance = payload;
      store.commit("saveBalance");
    },
    fetchBalance(state) {
      state.balance =
        JSON.parse(
          window.localStorage.getItem(localStorageBalanceKeyName) as string
        ) || 0;
    }
  },
  actions: {},
  modules: {},
  getters: {
    tagList(state) {
      return state.tagList;
    },
    isAnimation(state) {
      return state.isAnimation;
    },
    recordList(state) {
      return state.recordList;
    },
    balance(state) {
      return state.balance;
    }
  }
});
