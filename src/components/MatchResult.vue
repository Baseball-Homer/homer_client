<template>
  <v-card
    :class="`mx-auto ${win ? 'bg-green' : 'bg-red'}`"
  >
    <div class="text-truncate ml-3 mt-3">
      <h2>{{ homeAndAway }}</h2>
    </div>

    <v-card-title class="pt-4">
      {{ user.ownerName }}
    </v-card-title>
    <div class="ml-3 text-h6">
      Total Score : {{ score }}
    </div>
  </v-card>
</template>
<script setup>
const {homeAndAway, user, score, win} = defineProps(['homeAndAway', 'user', 'score', 'win']);

</script>
