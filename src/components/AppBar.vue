<template>
  <v-app-bar
    flat
    @click="goHome"
  >
    <v-app-bar-title>
      <v-icon icon="mdi-baseball" />
      Homer
    </v-app-bar-title>
  </v-app-bar>
</template>

<script setup>

import {useRouter} from "vue-router";

const router = useRouter();
const goHome = () => router.push('/');
</script>
