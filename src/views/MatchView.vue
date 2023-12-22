<template>
  <v-container>
    <v-row class="mb-10">
      <v-col
        cols="12"
        md="6"
      >
        <v-sheet
          rounded="lg"
        >
          <match-result
            home-and-away="HOME"
            :user="user"
            :score="homeScore"
            :win="homeScore > awayScore"
          />
        </v-sheet>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-sheet
          rounded="lg"
        >
          <match-result
            home-and-away="AWAY"
            :user="awayUser"
            :score="awayScore"
            :win="homeScore < awayScore"
          />
        </v-sheet>
      </v-col>
    </v-row>
    <div class="d-flex justify-space-around">
      <v-timeline
        align="start"
      >
        <v-timeline-item
          v-for="(match,i) in result"
          :key="match.inning"
          size="small"
        >
          <template #opposite>
            <div
              :class="`text-h5 headline font-weight-bold text-blue-grey`"
              v-text="getInningName(i)"
            />
          </template>
          <div>
            <div
              v-for="reply in match.reply"
              :key="reply"
              :class="`mb-3 text-h6`"
            >
              <div>
                {{ reply }}
              </div>
            </div>
            <div
              v-if="match.score > 0"
              class="text-sm-h5 text-red-lighten-1 font-weight-bold"
            >
              Score : {{ match.score }}
            </div>
          </div>
        </v-timeline-item>
      </v-timeline>
    </div>
  </v-container>
</template>


<script setup>
import {storeToRefs} from "pinia";
import {useMatchStore} from "@/store/match";
import MatchResult from "@/components/MatchResult.vue";
import {useRoute} from "vue-router";
import {useUserStore} from "@/store/user";
import {onMounted, onUnmounted, reactive} from "vue";

const getInningName = (i) => i % 2 === 0 ? `${Math.floor(i / 2) + 1} Inning Top` : `${Math.floor(i / 2) + 1} Inning Bottom`;

const route = useRoute();
const userStore = useUserStore();
const matchStore = useMatchStore();
const {homeId, awayId} = route.query;

const {matches, homeScore, awayScore} = storeToRefs(matchStore);
const {user} = storeToRefs(userStore);

const awayUser = userStore.findOtherUserBySquadId(Number(awayId));
const result = reactive([]);

let idx = 0;
let intervalId = 0;

onMounted(async () => {
  await matchStore.playMatch(homeId, awayId);

  intervalId = setInterval(function () {
    if (result.length === matches.value.length) {
      clearInterval(intervalId);
    }

    result[idx] = matches.value[idx];
    idx++;
  }, 1000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});

</script>
