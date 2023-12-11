import {defineStore} from "pinia";
import api from "@/api";

export const useMatchStore = defineStore("match", {
  state: () => ({
    matches: {}
  }),
  actions: {
    async fetchMatches(userId, awayId) {
      const {data} = await api.match.createMatch(userId, awayId);

      this.matches = Object.entries(data).map(([inning, reply]) => {
        const score = reply[reply.length - 1];
        reply.splice(reply.length - 1, 1);

        return {inning, reply, score}
      })
    },
  },
});
