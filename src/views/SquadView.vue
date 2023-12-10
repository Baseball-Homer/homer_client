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
        <v-img
          class="mx-auto"
          :src="!players[8] ? addImageUrl : players[8].playerPhoto"
          width="50px"
          height="50px"
          @click="()=>onClickPlayerAddButton(8)"
        />
      </v-col>
      <v-spacer />
    </v-row>
    <v-row
      class="justify-center"
    >
      <v-spacer />
      <v-col cols="3">
        <v-img
          class="ml-16"
          :src="!players[7] ? addImageUrl : players[7].playerPhoto"
          width="50px"
          height="50px"
          @click="()=>onClickPlayerAddButton(7)"
        />
      </v-col>
      <v-col cols="5">
        <v-img
          :src="!players[9] ? addImageUrl : players[9].playerPhoto"
          width="50px"
          height="50px"
          @click="()=>onClickPlayerAddButton(9)"
        />
      </v-col>
    </v-row>
    <v-row />
    <v-row />
    <v-row
      class="justify-center"
    >
      <v-col cols="1">
        <v-img
          class="mx-auto"
          :src="!players[6] ? addImageUrl : players[6].playerPhoto"
          width="50px"
          height="50px"
          @click="()=>onClickPlayerAddButton(6)"
        />
      </v-col>
      <v-col cols="1">
        <v-img
          class="mx-auto"
          :src="!players[4] ? addImageUrl : players[4].playerPhoto"
          width="50px"
          height="50px"
          @click="()=>onClickPlayerAddButton(4)"
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
        <v-img
          class="mx-13"
          :src="!players[5] ? addImageUrl : players[5].playerPhoto"
          width="50px"
          height="50px"
          @click="()=>onClickPlayerAddButton(5)"
        />
      </v-col>
      <v-col cols="1">
        <v-img
          class="mx-auto"
          :src="!players[1] ? addImageUrl : players[1].playerPhoto"
          width="50px"
          height="50px"
          @click="()=>onClickPlayerAddButton(1)"
        />
      </v-col>
      <v-col cols="1">
        <v-img
          class="mx-5"
          :src="!players[3] ? addImageUrl : players[3].playerPhoto"
          width="50px"
          height="50px"
          @click="()=>onClickPlayerAddButton(3)"
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
          width="50px"
          height="50px"
          @click="onClickManagerAdd"
        />
      </v-col>
      <v-col cols="3">
        <v-img
          class="mx-auto"
          :src="!players[2] ? addImageUrl : players[2].playerPhoto"
          width="50px"
          height="50px"
          @click="()=>onClickPlayerAddButton(2)"
        />
      </v-col>
      <v-col cols="3">
        <v-img
          class="mx-16"
          :src="!players[10] ? addImageUrl : players[10].playerPhoto"
          width="50px"
          height="50px"
          @click="()=>onClickPlayerAddButton(10)"
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

const {fetchPlayers, resetPlayers} = usePlayerStore();
const {user} = useUserStore();
const squadStore = useSquadStore();

const addImageUrl = 'src/assets/add.png';
const manager = ref(squadStore.squad.manager);
const showPlayerPopup = ref(false);
const showManagerPopup = ref(false);
const players = reactive(squadStore.players);
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
  const playerReqs = players.map((player, position)=>({ position, playerId: player.playerId}));

  console.log({
    managerId,userId,players: playerReqs
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
  height:50px;
}
.v-col {

}
</style>
