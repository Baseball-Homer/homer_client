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
          :src="!players.has(8) ? addImageUrl : players.get(8).image"
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
          :src="!players.has(7) ? addImageUrl : players.get(7).image"
          width="50px"
          height="50px"
          @click="()=>onClickPlayerAddButton(7)"
        />
      </v-col>
      <v-col cols="5">
        <v-img
          :src="!players.has(9) ? addImageUrl : players.get(9).image"
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
          :src="!players.has(6) ? addImageUrl : players.get(6).image"
          width="50px"
          height="50px"
          @click="()=>onClickPlayerAddButton(6)"
        />
      </v-col>
      <v-col cols="1">
        <v-img
          class="mx-auto"
          :src="!players.has(4) ? addImageUrl : players.get(4).image"
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
          :src="!players.has(5) ? addImageUrl : players.get(5).image"
          width="50px"
          height="50px"
          @click="()=>onClickPlayerAddButton(5)"
        />
      </v-col>
      <v-col cols="1">
        <v-img
          class="mx-auto"
          :src="!players.has(1) ? addImageUrl : players.get(1).image"
          width="50px"
          height="50px"
          @click="()=>onClickPlayerAddButton(1)"
        />
      </v-col>
      <v-col cols="1">
        <v-img
          class="mx-5"
          :src="!players.has(3) ? addImageUrl : players.get(3).image"
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
          :src="manager === null ? addImageUrl : manager.image"
          width="50px"
          height="50px"
          @click="onClickManagerAdd"
        />
      </v-col>
      <v-col cols="3">
        <v-img
          class="mx-auto"
          :src="!players.has(2) ? addImageUrl : players.get(2).image"
          width="50px"
          height="50px"
          @click="()=>onClickPlayerAddButton(2)"
        />
      </v-col>
      <v-col cols="3">
        <v-img
          class="mx-16"
          :src="!players.has(10) ? addImageUrl : players.get(10).image"
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
const onClickSaveButton = () => alert('Squad Saved'); //TODO API 연동

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

.v-row {
  height:50px;
}
.v-col {

}
</style>
