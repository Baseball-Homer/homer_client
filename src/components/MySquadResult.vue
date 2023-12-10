<template>
  <v-card
    class="mx-auto"
  >
    <div class="text-truncate ml-3 mt-3">
      <h2>My Squad Results</h2>
    </div>

    <v-card-title class="pt-4">
      Total Rate :
      <h2 class="d-inline text-green">
        {{ squadStat.totalRate }}%
      </h2>
      ({{ `${squadStat.totalWins} win/${squadStat.totalLoses} loses` }})
    </v-card-title>
    <v-divider />
    <v-card-text>
      <h3>Home Win Rate : {{ squadStat.homeWinRate }}%</h3>
      <h3>Away Win Rate : {{ squadStat.awayWinRate }}%</h3>
    </v-card-text>
  </v-card>
</template>
<script setup>
import {storeToRefs} from "pinia";
import {useSquadStore} from "@/store/squad";

const {squadStat} = storeToRefs(useSquadStore());
</script>
