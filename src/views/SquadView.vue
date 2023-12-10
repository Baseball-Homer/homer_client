<template>
  <v-app class="app">
    <v-row />
    <v-row />
    <v-row />
    <v-row
      class="justify-center"
    >
      <v-spacer />
      <v-col
        cols="1"
      >
        <squad-player
          :player="players[7]"
          @open="()=>onClickPlayerAddButton(7)"
        />
      </v-col>
      <v-spacer />
    </v-row>
    <v-row
      class="justify-center"
    >
      <v-col cols="3">
        <squad-player
          :player="players[6]"
          @open="()=>onClickPlayerAddButton(6)"
        />
      </v-col>
      <v-col cols="3">
        <squad-player
          :player="players[8]"
          @open="()=>onClickPlayerAddButton(8)"
        />
      </v-col>
    </v-row>
    <v-row />
    <v-row />
    <v-row
      class="justify-center"
    >
      <v-col cols="1">
        <squad-player
          :player="players[5]"
          @open="()=>onClickPlayerAddButton(5)"
        />
      </v-col>
      <v-col cols="1">
        <squad-player
          :player="players[3]"
          @open="()=>onClickPlayerAddButton(3)"
        />
      </v-col>
    </v-row>
    <v-row />
    <v-row
      class="justify-center"
    >
      <v-col
        cols="1"
        style="padding-right:0"
      >
        <squad-player
          :player="players[4]"
          @open="()=>onClickPlayerAddButton(4)"
        />
      </v-col>
      <v-col cols="1">
        <squad-player
          :player="players[0]"
          @open="()=>onClickPlayerAddButton(0)"
        />
      </v-col>
      <v-col cols="1">
        <squad-player
          :player="players[2]"
          @open="()=>onClickPlayerAddButton(2)"
        />
      </v-col>
    </v-row>
    <v-row />
    <v-row
      class="justify-center"
    >
      <v-col cols="3">
        <v-img
          :src="manager === null ? addImageUrl : manager.photo"
          width="100px"
          height="100px"
          @click="onClickManagerAdd"
        />
      </v-col>
      <v-col cols="3">
        <squad-player
          :player="players[1]"
          @open="()=>onClickPlayerAddButton(1)"
        />
      </v-col>
      <v-col cols="3">
        <squad-player
          :player="players[9]"
          @open="()=>onClickPlayerAddButton(9)"
        />
      </v-col>
    </v-row>

    <PlayerSearch
      :show-dialog="showPlayerPopup"
      :position="position"
      @save="setPlayer"
      @search="searchPlayer"
      @close="onClickPlayerPopupClose"
    />

    <ManagerSearch
      :show-dialog="showManagerPopup"
      @save="setManager"
      @close="onClickManagerAdd"
    />
    <v-btn
      color="green"
      size="x-large"
      class="save-btn"
      @click="onClickSaveButton"
    >
      Save
    </v-btn>
  </v-app>
</template>

<script setup>
import {reactive, ref} from "vue";
import PlayerSearch from "@/components/PlayerSearch.vue";
import ManagerSearch from "@/components/ManagerSearch.vue";
import {usePlayerStore} from "@/store/player";
import {useUserStore} from "@/store/user";
import {useSquadStore} from "@/store/squad";
import {useRoute} from "vue-router";
import SquadPlayer from "@/components/SquadPlayer.vue";

const {fetchPlayers, resetPlayers} = usePlayerStore();
const {user} = useUserStore();
const squadStore = useSquadStore();
const {createSquad, updateSquad} = squadStore;
const route = useRoute();
const {mode} = route.query;

const addImageUrl = 'src/assets/add.png';
const manager = ref(squadStore.squad.manager);
const showPlayerPopup = ref(false);
const showManagerPopup = ref(false);
const players = reactive([...squadStore.players]);
const position = ref(0);


const onClickPlayerAddButton = (positionIndex) => {
  showPlayerPopup.value = !showPlayerPopup.value;
  position.value = positionIndex;
};
const onClickPlayerPopupClose = () => {
  showPlayerPopup.value = !showPlayerPopup.value;
  resetPlayers();
}

const onClickManagerAdd = () => (showManagerPopup.value = !showManagerPopup.value);
const onClickSaveButton = () => {
  const {managerId} = manager.value;
  const {userId} = user;
  const playerReqs = players.map((player, position) => ({position, playerId: player.playerId}));

  console.log({
    managerId, userId, players: playerReqs
  })
}

const setManager = selectedManager => manager.value = selectedManager;
const setPlayer = (position, selectedPlayer) => players[position] = selectedPlayer;

const searchPlayer = ({clubId, playerName}) => {
  fetchPlayers({
    position: position.value,
    clubId,
    playerName
  });
}
</script>

<style scoped>
.app {
  background: url("@/assets/baseball-diamond.png") no-repeat center center !important;
  height: 100vh;
}

.save-btn {
  width: 7%;
  left: 85%;
  bottom: 20%;
}

.v-row {
  height: 100px;
}

.v-col {

}
</style>
