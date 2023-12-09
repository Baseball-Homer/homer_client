<template>
  <v-app id="inspire">
    <v-main class="bg-grey-lighten-3">
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="3"
          >
            <v-sheet
              rounded="lg"
              min-height="268"
            >
              <manager />
            </v-sheet>
            <v-sheet
              rounded="lg"
              min-height="268"
            >
              <friend-list />
            </v-sheet>
          </v-col>

          <v-col
            cols="12"
            md="9"
          >
            <v-sheet
              min-height="70vh"
              rounded="lg"
            >
              <my-squad-list />
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import Manager from "@/components/Manager.vue";
import FriendList from "@/components/FriendList.vue";
import MySquadList from "@/components/MySquadList.vue";

const links = ["Home", "Squad", "Game"];
</script>

<script>
export default {
  data: () => ({
    links: ["Home", "Squad", "Game"],
  }),
};
</script>
