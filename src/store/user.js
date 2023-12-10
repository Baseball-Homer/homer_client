import {defineStore} from "pinia";
import api from "@/api";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: {
      email: null,
      ownerName: null,
      squadId: null,
      userId: null
    },
    otherUsers: []
  }),
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
