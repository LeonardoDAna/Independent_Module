import { defineStore } from "pinia";
import { getMenuListByRole, getBackMenu } from "@/api_v2/menu";

export const useMenuStore = defineStore("menuStore", {
  state: () => ({
    routes: [],
    menus: [],
  }),
  getters: {
    get_routes: (state) => state.routes,
    get_menus: (state) => state.menus,
  },
  actions: {
    set_menus(data) {
      this.menus = data;
    },

    async get_BackMenu() {
      return new Promise((resolve, reject) => {

        // let roleId = JSON.parse(localStorage.getItem("userInfo")).role.roleId;
        let roleId = JSON.parse(sessionStorage.getItem("userInfo")).role.roleId;

        getMenuListByRole(roleId)
          // getBackMenu()
          .then((res) => {
            // 每次登录清空
            // localStorage.setItem("menus", JSON.stringify(res.data));
            sessionStorage.setItem("menus", JSON.stringify(res.data));
            this.set_menus(res.data);
            resolve(res.data);
          })
          .catch((error) => {
            this.set_menus([]);
            reject(error);
          });
      });
    },
  },
});
