import {defineStore} from "pinia";
import api from "@/api";

export const useMatchStore = defineStore("match", {
  state: () => ({
    matches: {}
  }),
  actions: {
    async fetchMatches(userId, awayId) {
      const {data} = await api.match.createMatch(userId, awayId);
      this.matches = data;
    },
  },
});
