<template>
  <v-card
    class="mx-auto"
  >
    <div class="text-truncate ml-3 mt-3">
      <h2>My Information</h2>
    </div>

    <v-card-title class="pt-4">
      {{ user.ownerName }}
    </v-card-title>
    <v-divider />
    <v-card-text>
      <h3>{{ user.email }}</h3>
    </v-card-text>
  </v-card>
</template>
<script setup>
import {useUserStore} from "@/store/user";
import {storeToRefs} from "pinia";

const {user} = storeToRefs(useUserStore());
</script>
