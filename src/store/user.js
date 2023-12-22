import {defineStore} from "pinia";
import api from "@/api";

const STORE_NAME = 'user';
const DEFAULT_USER = {
  email: null,
  ownerName: null,
  squadId: null,
  userId: null
};

export const useUserStore = defineStore(STORE_NAME, {
  state: () => ({
    user: DEFAULT_USER,
    otherUsers: []
  }),
  actions: {
    async fetchAll() {
      const userId = localStorage.getItem('userId') || 1;
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
    },
    findOtherUserBySquadId(squadId) {
      return this.otherUsers.find(it => it.squadId === squadId) || DEFAULT_USER;
    }
  }
});
