import {defineStore} from "pinia";
import api from "@/api";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null, otherUsers: []
  }),
  // getters: {
  //   getUser: (state) => {
  //     return state.user;
  //   }
  // },

  actions: {
    async fetchAll(userId) {
      await this.fetchUser(userId);
      await this.fetchOtherUser(userId);
    },

    async fetchUser(userId) {
      const {data} = await api.user.getUser(userId);
      this.user = {userId, ...data};
    },

    async fetchOtherUser(userId) {
      const {data} = await api.user.getOtherUser(userId);
      this.otherUsers = data;
    }
  }
});
