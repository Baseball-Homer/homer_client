import {defineStore} from "pinia";
import api from "@/api";

const STORE_NAME = 'match';

export const useMatchStore = defineStore(STORE_NAME, {
  state: () => ({
    matches: []
  }),
  getters: {
    homeScore(state) {
      return this.reduceScore(state.matches, (it, idx) => idx % 2 !== 0)
    },
    awayScore(state) {
      return this.reduceScore(state.matches, (it, idx) => idx % 2 === 0)
    }
  },
  actions: {
    async playMatch(homeId, awayId) {
      const {data} = await api.match.playMatch(homeId, awayId);

      this.matches = Object.entries(data).map(([inning, reply]) => {
        const score = reply[reply.length - 1];
        reply.splice(reply.length - 1, 1);

        return {inning, reply, score}
      })
    },
    reduceScore(matches, filter) {
      return matches
        .filter(filter)
        .map(it => it.score)
        .map(it => Number(it))
        .reduce((sum, score) => sum + score, 0)
    }
  }
});
