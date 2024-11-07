import { defineStore } from "pinia";

export const useAppStore = defineStore("appStore", {
  state: () => ({
    isMoblie: false, //是否是移动端
  }),
  getters: {
    getIsMoblie: (state) => state.isMoblie,
  },
  actions: {
    setIsMoblie(val) {
      this.isMoblie = val;
    },
  },
});
