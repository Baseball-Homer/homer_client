import {defineStore} from "pinia";
import api from "@/api";

export const usePlayerStore = defineStore("player", {
  state: () => ({
    players: [], managers: {}
  }),
  actions: {
    resetPlayers(){
      this.players = [];
    },

    async fetchPlayers(playerSearchRequest) {
      const {data} = await api.player.getPlayers(playerSearchRequest);
      this.players = data;
    },

    resetManagers(){
      this.players = [];
    },

    async fetchManagers() {
      const {data} = await api.player.getManagers();
      this.managers = data;
    }
  }
});
