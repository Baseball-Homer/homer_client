<template>
  <v-card
    class="mx-auto"
    max-width="600"
  >
    <v-list lines="two">
      <v-list-subheader>
        Rival Users
      </v-list-subheader>

      <v-list-item
        v-for="friend in otherUsers"
        :key="friend.userId"
        :title="friend.ownerName"
      >
        <template #prepend>
          <v-avatar>
            <v-icon>mdi-account</v-icon>
          </v-avatar>
        </template>

        <template #append>
          <div class="text-center">
            <v-btn
              append-icon="mdi-baseball"
              @click="goMatch"
            >
              Match
            </v-btn>
          </div>
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script setup>
import {useRouter} from "vue-router";
import {storeToRefs} from "pinia";
import {useUserStore} from "@/store/user";

const router = useRouter();
const goMatch = () => router.push("/match");

const {otherUsers} = storeToRefs(useUserStore());
</script>
