import {defineStore} from "pinia";
import api from "@/api";
import {useUserStore} from "@/store/user";
import positionCodes from "@/assets/playerPosition.json"

export const useSquadStore = defineStore("squad", {
  state: () => ({
    squad: {
      manager: {
        name: null,
        photo: null,
        pitcherBoost: 0,
        batterBoost: 0
      },
      batter: [],
      pitcher: {
        clubName: null,
        firstName: null,
        gamePlayed: 0,
        innings: 0,
        lastName: null,
        losses: 0,
        position: null,
        primaryNum: 0,
        playerPhoto: null,
        wins: 0,
      }
    },
    squadStat: {
      awayWinRate: 0,
      homeWinRate: 0,
      totalLoses: 0,
      totalRate: 0,
      totalWins: 0,
    }
  }),
  getters: {
    manager: (state) => {
      return state.squad.manager;
    },
    players: (state) => {
      const {batter, pitcher} = state.squad;
      return [pitcher, ...batter];
    }
  },

  actions: {
    async fetchAll() {
      const {user} = useUserStore();

      await this.fetchSquad(user.squadId);
      await this.fetchSquadStatistics(user.userId);
    },

    async fetchSquad(squadId) {
      const {data} = await api.squad.getSquad(squadId);
      const {batterResponses, managerResponse, pitcherResponse} = data;

      this.squad = {
        batter: { positionName: positionCodes[batterResponses.position], ...batterResponses},
        manager: managerResponse,
        pitcher: { positionName: positionCodes[pitcherResponse.position], ...pitcherResponse}
      }
    },

    async fetchSquadStatistics(userId) {
      const {data} = await api.squad.getSquadStatistics(userId);
      this.squadStat = data;
    }
  }
});
