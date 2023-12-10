<template>
  <v-img
    v-if="!player"
    :src="addImageUrl"
    width="50px"
    height="50px"
    @click="()=>emits('open')"
  />
  <v-img
    v-else
    :src="player.playerPhoto"
    width="80px"
    height="100px"
    @click="()=>emits('open')"
  />
  <div class="position font-weight-bold">
    {{ `${player.lastName }` }}
  </div>
</template>

<script setup>
const addImageUrl = 'src/assets/add.png';
const {player} = defineProps(['player']);
const emits = defineEmits(['open']);


</script>

<style scoped>
.v-img {
  margin-left: 35%;
}
.position {
  margin-left: 40%;
}
</style>
