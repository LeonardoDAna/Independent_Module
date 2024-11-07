import { isEmpty } from "@/utils/common";
import router from "@/router";
import {
  getToken,
  setToken,
  removeToken,
  setUserInfo,
  removeUserInfo,
} from "@/utils/auth";
import { login, logout, getCurrentUserInfo } from "@/api_v2/user";
import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    userInfo: {},
    token: getToken(),
    routes: [],
    menus: [],
    isLogin: false,
    isFirstLogin: sessionStorage.getItem("isFirstLogin") || 0,
    isOverdue: sessionStorage.getItem("isOverdue") || 0,
  }),
  getters: {
    get_userName: (state) => state.userInfo.name,
    get_userInfo: (state) =>
      isEmpty(state.userInfo)
        ? JSON.parse(sessionStorage.getItem("userInfo"))
        : state.userInfo,
    get_token: (state) => state.token,
    get_isFirstLogin: (state) => {
      return state.isFirstLogin;
    },
    get_isOverdue: (state) => state.isOverdue,
  },
  actions: {
    set_isOverdue(data) {
      this.isOverdue = data;
      sessionStorage.setItem("isOverdue", data);
    },
    set_isFirstLogin(data) {
      this.isFirstLogin = data;
      sessionStorage.setItem("isFirstLogin", data);
    },
    set_routes(data) {
      this.routes = data;
    },
    set_menus(data) {
      this.menus = data;
    },
    set_token(userName, data) {
      this.token = data;
      setToken(userName, data);
    },
    remove_token() {
      this.token = "";
      removeToken();
    },
    set_userInfo(data) {
      this.userInfo = data;
      // localStorage.setItem("userInfo", JSON.stringify(data));
      sessionStorage.setItem("userInfo", JSON.stringify(data));
    },

    // 登录
    action_login(data) {
      return new Promise((resolve, reject) => {
        let lower_authCode = data.authCode.toLowerCase();
        console.log("lower_authCode", lower_authCode);
        const loginFormData = {
          userName: data.account,
          // password: md5(md5(data.password) + data.authCode),
          password: md5(md5(data.password) + lower_authCode) + data.authCode,
        };
        sessionStorage.setItem("userName", loginFormData.userName);
        login(loginFormData)
          .then(async (response) => {
            const { data } = response;
            this.set_token(loginFormData.userName, data.token);
            await getCurrentUserInfo()
              .then((res) => {
                sessionStorage.setItem("isLogin", true);
                this.set_userInfo(res.data);
                // this.set_token(res.data.id, data.token);
                resolve(response);
                // localStorage.setItem("isLogin", true);
                // this.set_userInfo(JSON.stringify(res.data));
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((error) => {
            reject(error);
            console.log(error);
          });
      });
    },

    // 登出
    action_logout() {
      return new Promise((resolve, reject) => {
        logout()
          .then((response) => {
            let userName = sessionStorage.getItem("userName");
            this.set_userInfo({});

            sessionStorage.removeItem("isLogin");
            sessionStorage.removeItem("userInfo");
            sessionStorage.removeItem("menus");
            sessionStorage.removeItem("userName");
            removeToken(userName);

            resolve(response);
            // localStorage.setItem("isLogin", false);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    async action_ridGlobalMounting() {
      const { data } = await ridGlobalMounting();
      const routes = data
        .filter((item) => item.state == 0 && item.url && item.model == 0)
        .map((val) => val.url);
      this.set_routes(routes);
      const menus = data
        .filter((item) => item.model == 1 && item.state == 0)
        .map((val) => val.pid);
      this.set_menus(menus);
      return routes;
    },
  },
});
