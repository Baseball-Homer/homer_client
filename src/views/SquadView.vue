<template>
  <v-app class="app">
    <v-list-item
      v-for="(item,idx) in Array.from({length: 10})"
      :key="idx"
    >
      <v-img
        :src="!players.has(idx) ? addImageUrl : players.get(idx).image"
        width="50px"
        height="50px"
        @click="()=>onClickPlayerAddButton(idx)"
      />
    </v-list-item>

    <v-img
      :src="manager === null ? addImageUrl : manager.image"
      width="50px"
      height="50px"
      @click="onClickManagerAdd"
    />

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
      저장 하기
    </v-btn>
  </v-app>
</template>

<script setup>
import {ref} from "vue";
import PlayerSearch from "@/components/PlayerSearch.vue";
import ManagerSearch from "@/components/ManagerSearch.vue";

const addImageUrl = 'src/assets/add.png';
const manager = ref(null);
const showPlayerPopup = ref(false);
const showManagerPopup = ref(false);
const players = ref(new Map());
const position = ref(0);


const onClickPlayerAddButton = (positionIndex) => {
  showPlayerPopup.value = !showPlayerPopup.value;
  position.value = positionIndex;
};
const onClickPlayerPopupClose = () => showPlayerPopup.value = !showPlayerPopup.value;

const onClickManagerAdd = () => (showManagerPopup.value = !showManagerPopup.value);
const onClickSaveButton = () => alert('저장 되었습니다'); //TODO API 연동

const setManager = selectedManager => manager.value = selectedManager;
const setPlayer = (position, selectedPlayer) => players.value.set(position, selectedPlayer);

const searchPlayer = ({ clubId, playerName}) => {
  //TODO API 연동
  alert(`clubId : ${clubId} playerName: ${playerName}`);
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
</style>
