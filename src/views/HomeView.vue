<template>
  <v-app>
    <v-main class="bg-grey-lighten-3">
      <v-container>
        <v-row>
          <v-col
            cols="12"
            md="3"
          >
            <v-sheet
              rounded="lg"
            >
              <my-info />
            </v-sheet>
          </v-col>
          <v-col
            cols="12"
            md="9"
          >
            <v-sheet
              rounded="lg"
            >
              <my-squad-result />
            </v-sheet>
          </v-col>
        </v-row>
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
              class="mt-5"
              rounded="lg"
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
import Manager from "@/components/squad/manager/Manager.vue";
import FriendList from "@/components/user/FriendList.vue";
import MySquadList from "@/components/squad/MySquadList.vue";
import {useUserStore} from "@/store/user";
import {useSquadStore} from "@/store/squad";
import {onMounted} from "vue";
import MyInfo from "@/components/user/MyInfo.vue";
import MySquadResult from "@/components/squad/MySquadResult.vue";

const userStore = useUserStore();
const squadStore = useSquadStore();

onMounted(async ()=>{
  await userStore.fetchAll();
  await squadStore.fetchAll();
});

</script>
