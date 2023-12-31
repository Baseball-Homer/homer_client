import {defineStore} from "pinia";
import api from "@/api";
import {useUserStore} from "@/store/user";
import positionCodes from "@/assets/playerPosition.json"

const STORE_NAME = 'squad';

const DEFAULT_SQUAD = {
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
}

const DEFAULT_SQUAD_STATS = {
  awayWinRate: 0,
  homeWinRate: 0,
  totalLoses: 0,
  totalRate: 0,
  totalWins: 0,
}

export const useSquadStore = defineStore(STORE_NAME, {
  state: () => ({
    squad: DEFAULT_SQUAD,
    squadStat: DEFAULT_SQUAD_STATS
  }),
  getters: {
    manager: (state) => {
      return state.squad.manager;
    },
    players: (state) => {
      const {batter, pitcher} = state.squad;

      if (!batter.length) return [];

      return [pitcher, ...batter];
    }
  },

  actions: {
    async fetchAll() {
      const {user} = useUserStore();

      if (!user.squadId) return;

      await this.fetchSquad(user.squadId);
      await this.fetchSquadStatistics(user.userId);
    },

    async fetchSquad(squadId) {
      const {data} = await api.squad.getSquad(squadId);
      const {batterResponses, managerResponse, pitcherResponse} = data;

      this.squad = {
        batter: batterResponses.map(batter => ({
          ...batter,
          positionName: positionCodes[batter.position]
        })),
        manager: managerResponse,
        pitcher: {positionName: positionCodes[pitcherResponse.position], ...pitcherResponse}
      }
    },

    async fetchSquadStatistics(userId) {
      const {data} = await api.squad.getSquadStatistics(userId);

      if (!data.totalRate) return;
      this.squadStat = data;
    },

    async updateSquad(req) {
      await api.squad.updateSquad(req);
    },

    async createSquad(req) {
      await api.squad.createSquad(req);
    },

    setManager(manager) {
      this.squad.manager = manager;
    },
    setPlayer(positionIndex, player) {
      if (positionIndex === 0) {
        this.squad.pitcher = player;
      } else {
        this.squad.batter[positionIndex - 1] = player;
      }
    }
  }
});
