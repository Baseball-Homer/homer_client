<template>
  <v-card
    class="mx-auto"
    max-width="600"
  >
    <div class="text-truncate ml-3 mt-3">
      <h2>Squad Manager</h2>
    </div>

    <v-img
      height="200"
      :src="manager.photo"
    />

    <v-card-title class="pt-4">
      {{ manager.name }}
    </v-card-title>
    <v-divider />
    <v-card-text>
      <div
        v-for="item in manager.managerBoosts"
        :key="item.ability"
      >
        {{ `${item.ability} : +${item.abilityValue}` }}
      </div>
    </v-card-text>
  </v-card>
</template>
<script setup>
import {useSquadStore} from "@/store/squad";
import {storeToRefs} from "pinia";

const {manager} = storeToRefs(useSquadStore());
</script>
