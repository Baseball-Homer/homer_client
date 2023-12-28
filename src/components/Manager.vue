<template>
  <v-card class="mx-auto" max-width="600">
    <v-card-title class="text-h5"> 내 감독 </v-card-title>

    <v-img height="200" :src="manager.image" />

    <v-card-title class="pt-4">
      {{ manager.name }}
    </v-card-title>
    <v-divider />
    <v-card-text>
      <div>투수 능력치 : +{{ manager.pitcherBoost }}</div>

      <div>타자 능력치 : +{{ manager.batterBoost }}</div>
    </v-card-text>
  </v-card>
</template>
<script setup>
import { ref } from "vue";

const mockManager = {
  managerId: 1,
  name: "Don Mattingly",
  image:
    "https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:83:current.png/ar_1:1,c_pad,b_auto:border/r_max/w_180,q_auto:best/v1/people/118443/headshot/83/coach/current",
  pitcherBoost: 4,
  batterBoost: 5,
};

const manager = ref(mockManager);
</script>
