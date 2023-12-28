<template>
  <v-card class="mx-auto" max-width="600">
    <v-list lines="two">
      <v-list-subheader inset> 내 친구들 </v-list-subheader>

      <v-list-item
        v-for="friend in friends"
        :key="friend.userId"
        :title="friend.name"
      >
        <template #prepend>
          <v-avatar color="grey-lighten-1">
            <v-icon>mdi-account</v-icon>
          </v-avatar>
        </template>

        <template #append>
          <div class="text-center">
            <v-btn append-icon="mdi-baseball" @click="goMatch">
              대결하기
            </v-btn>
          </div>
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const goMatch = () => router.push("/match");

const mockFriends = [
  {
    userId: 1,
    name: "이정렬",
  },
  {
    userId: 2,
    name: "김정렬",
  },
  {
    userId: 3,
    name: "박정렬",
  },
  {
    userId: 4,
    name: "홍정렬",
  },
];
const friends = ref(mockFriends);
</script>
