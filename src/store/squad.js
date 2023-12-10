import {defineStore} from "pinia";
import api from "@/api";
import {useUserStore} from "@/store/user";

export const useSquadStore = defineStore("squad", {
  state: () => ({
    squad: null, squadStat: null
  }),
  actions: {
    async fetchAll() {
      const {user} = useUserStore();

      await this.fetchSquad(user.squadId);
      await this.fetchSquadStatistics(user.userId);
    },

    async fetchSquad(squadId) {
      const {data} = await api.squad.getSquad(squadId);
      const {batterResponse, managerResponse, pitcherResponse} = data;

      this.squad = {
        batter: batterResponse,
        manager: managerResponse,
        pitcher: pitcherResponse
      }
    },

    async fetchSquadStatistics(userId) {
      const {data} = await api.squad.getSquadStatistics(userId);
      this.squadStat = data;
    }
  }
});
