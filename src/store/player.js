import {defineStore} from "pinia";
import api from "@/api";

const STORE_NAME = 'player';

export const usePlayerStore = defineStore(STORE_NAME, {
  state: () => ({
    players: [], managers: []
  }),
  actions: {
    resetPlayers(){
      this.players = [];
    },

    async fetchPlayers(req) {
      const {data} = await api.player.getPlayers(req);
      this.players = data;
    },

    async fetchManagers() {
      const {data} = await api.player.getManagers();
      this.managers = data;
    }
  }
});
